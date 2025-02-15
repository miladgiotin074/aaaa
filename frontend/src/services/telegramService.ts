import { Api } from "telegram";
import { computeCheck as computePasswordSrpCheck } from "telegram/Password";
import { useTelegramStore, initializeClient } from "@/stores/telegramStore";
import { api } from "@/utils/api";
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import { UserPasswordAuthParams } from "telegram/client/auth";

class TelegramService {
    async initialize() {
        const { client, setClient } = useTelegramStore.getState();

        if (!client) {
            const newClient = await initializeClient();
            setClient(newClient);
            return newClient;
        }

        return client;
    }

    async sendCode(phoneNumber: string) {
        const client = await this.initialize();
        if (!client) {
            throw new Error('Telegram client initialization failed');
        }
        try {
            const result = await client.invoke(new Api.auth.SendCode({
                phoneNumber,
                apiId: Number(import.meta.env.VITE_TELEGRAM_API_ID),
                apiHash: import.meta.env.VITE_TELEGRAM_API_HASH,
                settings: new Api.CodeSettings({
                    allowFlashcall: false,
                    currentNumber: false,
                    allowAppHash: false,
                    allowMissedCall: false,
                })
            }));

            console.log(result);

            if ('phoneCodeHash' in result) {
                return result;
            }
            throw new Error('Unexpected response format from Telegram API');
        } catch (error: any) {
            throw new Error(error?.errorMessage || 'Failed to send code');
        }
    }

    async signIn(phoneNumber: string, phoneCodeHash: string, code: string) {
        const client = await this.initialize();
        if (!client) {
            throw new Error('Telegram client initialization failed');
        }
        try {
            const result = await client.invoke(new Api.auth.SignIn({
                phoneNumber,
                phoneCodeHash,
                phoneCode: code
            }));
            return result;
        } catch (error) {
            throw new Error(this.formatError(error));
        }
    }

    async checkPassword(authParams: UserPasswordAuthParams) {
        console.log("==> authParams", authParams);

        const client = await this.initialize();
        if (!client) {
            throw new Error('Telegram client initialization failed');
        }
        try {
            const passwordSrpResult = await client.invoke(
                new Api.account.GetPassword()
            );

            const password = authParams.password ? await authParams.password(passwordSrpResult.hint) : '';

            if (password && password !== "") {
                console.log("==> password", password);
                const passwordSrpCheck = await computePasswordSrpCheck(
                    passwordSrpResult,
                    password
                );

                console.log("==> passwordSrpCheck", passwordSrpCheck);

                // Ensure the passwordSrpCheck is in the correct format
                const checkPasswordParams = new Api.InputCheckPasswordSRP({
                    srpId: passwordSrpCheck.srpId,
                    A: passwordSrpCheck.A,
                    M1: passwordSrpCheck.M1,
                });

                console.log("==> checkPasswordParams", checkPasswordParams);

                const { user } = (await client.invoke(
                    new Api.auth.CheckPassword({
                        password: checkPasswordParams,
                    })
                )) as Api.auth.Authorization;

                console.log("==> user", user);
                return user;
            }
        } catch (error) {
            console.log("==> error", error);
            throw new Error(this.formatError(error));
        }
    }

    async getActiveSessions() {
        const client = await this.initialize();
        if (!client) {
            throw new Error('Telegram client initialization failed');
        }
        try {
            const result = await client.invoke(new Api.account.GetAuthorizations());
            return result.authorizations;
        } catch (error) {
            throw new Error(this.formatError(error));
        }
    }

    async resetAuthState() {
        const { client } = useTelegramStore.getState();
        if (client) {
            try {
                await client.invoke(new Api.auth.ResetAuthorizations());
                await client.disconnect();
            } catch (error) {
                console.error('Error resetting auth state:', error);
            }
        }
    }

    async addAccountToServer(accountData: {
        phone: string;
        password: string;
        cleanSessions: boolean;
    }) {
        try {
            const client = await this.initialize();
            if (!client) {
                throw new Error('Telegram client initialization failed');
            }

            const sessionKey = client.session.save();

            const { data } = await api.post('/add-account', {
                ...accountData,
                sessionKey
            });
            return data;
        } catch (error: any) {
            throw new Error(error.response?.data?.error || 'Failed to add account');
        }
    }

    async getActiveSessionsWithKey(sessionKey: string) {
        const client = new TelegramClient(new StringSession(sessionKey),
            Number(import.meta.env.VITE_TELEGRAM_API_ID),
            import.meta.env.VITE_TELEGRAM_API_HASH,
            { connectionRetries: 5 }
        );

        try {
            await client.connect();
            const result = await client.invoke(new Api.account.GetAuthorizations());
            await client.disconnect();
            return result.authorizations;
        } catch (error) {
            throw new Error(this.formatError(error));
        }
    }

    private formatError(error: any): string {
        if (error?.errorMessage) {
            return error.errorMessage;
        }
        return 'An unexpected error occurred';
    }
}

export const telegramService = new TelegramService(); 