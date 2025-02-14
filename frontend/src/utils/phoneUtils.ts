import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';

export function validatePhoneNumber(phone: string, countryCode: CountryCode) {
    const phoneNumber = parsePhoneNumberFromString(phone, countryCode as CountryCode);
    return phoneNumber?.isValid() || false;
}

export function formatPhoneNumber(phone: string, countryCode: CountryCode) {
    const phoneNumber = parsePhoneNumberFromString(phone, countryCode as CountryCode);
    return phoneNumber?.formatInternational() || phone;
}

export function getCountryCode(phone: string): string | null {
    const phoneNumber = parsePhoneNumberFromString(phone);
    return phoneNumber?.countryCallingCode || null;
} 