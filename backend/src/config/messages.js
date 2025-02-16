export const BOT_MESSAGES = {
    start: "😍 خوش اومدی *{firstName}*\n\n👍 برای ادامه یک گزینه را انتخاب نمایید",
    startAdmin: "✅ سلام جناب *{firstName}* در خدمت گذاری حاظرم مدیر محترم\n\n👇 چیکار کنیم؟",
    membershipRequired: "🌷سلام *{firstName}*\n\n🧷 برای استفاده از ربات باید عضو کانال های زیر شوید.",
    joinCompleted: "✅ عضو شدم",
    error: "😅 یکم مشکل پیش اومده میشه بعدا امتحان کنی؟",
    notMemberAlert: "😉 هنوز عضو نشدی",
    membershipCheckError: "😱خطا در بررسی عضویت",
    buyAccount: "💰 خرید اکانت",
    checkNumber: "📱 استعلام شماره",
    wallet: "💳 کیف پول",
    userAccount: "👤 حساب کاربری",
    rules: "📜 قوانین و راهنما",
    support: "🆘 پشتیبانی",
    supportMessage: "📨 برای ارتباط با پشتیبانی در تلگرام روی دکمه زیر کلیک کنید",
    contactSupport: "📩 پیام به پشتیبانی",
    addAccount: "➕ افزودن اکانت",
    adminPanel: "🛠️ پنل مدیریت",
    rulesMessage: "📜 برای مشاهده قوانین و راهنمای استفاده از ربات روی دکمه زیر کلیک کنید",
    viewRules: "👀 مشاهده قوانین و راهنما",
    addAccountMessage: "➕ برای افزودن اکانت روی دکمه زیر کلیک کنید",
    enterPortal: "🔑 ورود به پورتال",
    accessDenied: "⛔️ دسترسی رد شد. فقط مدیران و ناظران می‌توانند از این دستور استفاده کنند.",
    rateLimitMessage: "⚠️ کاربر گرامی، شما در حال حاضر بیش از حد مجاز درخواست ارسال کرده‌اید.\n\n⏳ لطفاً مدتی صبر کنید و سپس مجدداً تلاش نمایید.",
    userNotFound: "❌ کاربر یافت نشد!",
    userAccountInfo: " *اطلاعات حساب کاربری:*\n\n" +
        "🆔 شناسه کاربر: \`{telegramId}\`\n\n" +
        "👤 نام کاربر: [{firstName}](tg://user?id={userId})\n\n" +
        "💰 موجودی: *{balance}* تومان\n\n" +
        "📱 تعداد اکانت‌های خریداری شده: *{purchasedAccountsCount}* عدد\n\n" +
        "📅 تاریخ عضویت: *{joinDate}*",
    accountError: "❌ خطایی در دریافت اطلاعات حساب کاربری رخ داد.",
    accountInquiry: "📊 *لیست اکانت‌های موجود*\n\n🔍 در جدول زیر می‌توانید لیست اکانت‌های موجود به تفکیک کشور، قیمت و تعداد را مشاهده نمایید:",
    accountInfo: "🌍 *{countryName}*\n\n💵 قیمت: *{price}* تومان\n📱 تعداد اکانت‌ها: *{accountCount}* عدد",
    noAccountsAvailable: "⚠️ در حال حاضر اکانتی برای فروش موجود نیست.",
    tableHeaderCountry: "🌍 کشور",
    tableHeaderPrice: "💰 قیمت",
    tableHeaderCount: "🔢 تعداد",
    displayOnlyButton: "ℹ️ این دکمه صرفاً جهت نمایش اطلاعات است",
    walletInfo: `💰 *اطلاعات کیف پول*\n\n` +
        `💳 موجودی شما: *{balance}* تومان\n\n` +
        `📈 مجموع شارژ حساب: *{totalDeposit}* تومان\n\n` +
        `🛒 مجموع خریدها: *{totalPurchases}* تومان\n\n` +
        `📱 تعداد اکانت خریداری شده: *{purchasedAccountsCount}* عدد\n\n` +
        `🕒 آخرین شارژ حساب: *{lastDepositDate}*\n\n` +
        `🕒 آخرین خرید: *{lastPurchaseDate}*`,
    increaseBalance: "➕ افزایش موجودی",
    noDepositYet: 'هنوز شارژ نکرده‌اید',
    noPurchaseYet: 'هنوز خریدی انجام نداده‌اید',
    increaseBalanceMessage: "💰 *افزایش موجودی*\n\nلطفاً یکی از روش‌های زیر را برای افزایش موجودی انتخاب کنید:",
    bankGateway: "🏦 درگاه بانکی",
    crypto: "💵 ارز دیجیتال",
    cardToCard: "💳 کارت به کارت",
    backToMainMenu: "🔙 بازگشت به منوی اصلی",
    paymentMethodDisabled: "⚠️ این روش پرداخت در حال حاضر فعال نمی‌باشد.",
    bankGatewayDisabled: "⚠️ درگاه بانکی در حال حاضر فعال نمی‌باشد.",
    cryptoDisabled: "⚠️ پرداخت با ارز دیجیتال در حال حاضر فعال نمی‌باشد.",
    cardToCardDisabled: "⚠️ پرداخت کارت به کارت در حال حاضر فعال نمی‌باشد.",
    cardToCardInstructions: `💳 *پرداخت کارت به کارت*\n\nلطفاً مبلغ مورد نظر را به شماره کارت زیر واریز نمایید و عکس رسید آن را همینجا ارسال کنید:\n\n\n🏦 شماره کارت: \`{cardNumber}\`\n\n👤 به نام: *{cardHolder}*\n\n💰 حداقل مبلغ واریز: *{minAmount}* تومان`,
    receiptReceived: '✅ رسید پرداخت شما دریافت شد. پس از تایید، موجودی حساب شما افزایش خواهد یافت.',
    invalidReceipt: '❌ عکس ارسالی معتبر نیست. لطفاً یک عکس واضح از رسید پرداخت ارسال کنید.',
    minAmountError: '❌ مبلغ واریزی باید حداقل {minAmount} تومان باشد.',
    cryptoInstructions: `💵 *پرداخت با ارز دیجیتال*\n\nلطفاً مبلغ مورد نظر را به آدرس ولت زیر ارسال نمایید و کد هش تراکنش را همینجا ارسال کنید:\n\n\n💳 آدرس ولت: \`{walletAddress}\`\n\n🌐 شبکه: *{network}*\n\n💰 حداقل مبلغ واریز: *{minAmount}* تومان\n\n🏦 ارز: *{currencyName}*`,
    transactionHashReceived: '✅ کد هش تراکنش شما دریافت شد. پس از تایید، موجودی حساب شما افزایش خواهد یافت.',
    invalidTransactionHash: '❌ کد هش تراکنش معتبر نیست. لطفاً یک کد هش معتبر ارسال کنید.',
    minCryptoAmountError: '❌ مبلغ واریزی باید حداقل {minAmount} تومان باشد.',
    accountPurchaseTerms: `📜 *شرایط و ضوابط خرید اکانت تلگرام*\n\n
1. اکانت‌ها به صورت کاملاً قانونی و با رعایت قوانین تلگرام ارائه می‌شوند.\n
2. هر اکانت فقط برای یک نفر قابل استفاده است.\n
3. در صورت بروز هرگونه مشکل، پشتیبانی 24 ساعته در دسترس است.\n
4. پس از خرید، امکان بازگشت وجه وجود ندارد.\n
5. مسئولیت استفاده نادرست از اکانت بر عهده خریدار است.\n\n
    با کلیک بر روی دکمه "قبول شرایط" موافقت خود را با این شرایط اعلام می‌کنید.`,
    acceptTerms: "✅ قبول شرایط",
    termsAccepted: "✅ شرایط و ضوابط را پذیرفتید. لطفاً کشور مورد نظر خود را انتخاب کنید:",
    termsDeclined: "❌ برای خرید اکانت باید شرایط و ضوابط را بپذیرید.",
    noAccountsAvailableForPurchase: "⚠️ در حال حاضر اکانتی برای فروش موجود نیست. لطفاً مدتی بعد مراجعه نمایید.",
    countrySelection: "{countryName}    ↔️    {price} تومان ",
    countryNotAvailable: "⚠️ کشور انتخابی در حال حاضر برای فروش فعال نیست.",
    noAccountsAvailableForCountry: "⚠️ در حال حاضر اکانتی از کشور انتخابی موجود نیست.",
    accountReserved: "✅ اکانت برای شما رزرو شد. لطفاً در مدت ۵ دقیقه کد را دریافت کنید.",
    accountReservationExpired: "⏰ زمان رزرو اکانت به پایان رسید. لطفاً دوباره تلاش کنید.",
    receiveCode: "📩 دریافت کد",
    confirmPurchase: "🔍 *آیا از خرید اکانت مطمئن هستید؟*\n\n🌍 کشور: *{countryName}*\n\n💵 قیمت: *{price}* تومان\n\n⚠️ با تایید خرید، مبلغ از موجودی شما کسر خواهد شد.",
    confirmPurchaseButton: "✅ تایید خرید",
    purchaseConfirmed: "✅ خرید شما با موفقیت انجام شد!",
    insufficientBalance: "❌ موجودی کافی نیست. لطفاً ابتدا موجودی خود را افزایش دهید.",
    purchaseSuccessMessage: `✅ *خرید با موفقیت انجام شد!*\n\n🌍 کشور: *{countryName}*\n\n 📱 شماره: \`{phoneNumber}\`\n\n💰 موجودی جدید: *{newBalance}* تومان\n\n💡 می‌توانید در قسمت حساب کاربری لیست اکانت‌های خریداری شده را مشاهده کنید.\n\n⚠️ روی شماره ضربه بزنید و شماره را کپی کنید و در تلگرام وارد کنید، سپس بعد از ارسال کد روی دکمه دریافت کد کلیک کنید`,
    getCodeButton: "📩 دریافت کد",
    accountNotFound: "❌ اکانت مورد نظر یافت نشد.",
    accountNotSold: "❌ این اکانت به شما فروخته نشده است.",
    codeRequestLimitReached: "⚠️ شما به حداکثر تعداد درخواست کد رسیده‌اید \n\n( {maxCodeRequests} درخواست )",
    noCodeFound: "❌ کدی یافت نشد. لطفاً دوباره تلاش کنید.",
    codeMessage: "*کد لاگین به اکانت*\n\n📱 شماره: \`{phone}\`\n\n🔑 کد: \`{code}\`\n\n🔐 رمز: \`{password}\`\n\n⚠️ این کد فقط برای شما ارسال شده است و هرگز آن را با کسی به اشتراک نگذارید.\n\n✅ بعد از لاگین موفق به اکانت می‌توانید با دکمه خروج ربات از اکانت، ربات را از اکانت خارج کنید.\n\n⚠️ توجه داشته باشید که بعد از خروج ربات از اکانت، دیگر امکان دریافت کد وجود نخواهد داشت.",
    logoutButton: "🚪 خروج ربات از اکانت",
    accountNotLoggedIn: "❌ ربات به اکانت لاگین نیست.",
    purchasedAccountsList: "📱 *لیست اکانت‌های خریداری شده*\n\nدر زیر می‌توانید لیست اکانت‌های خریداری شده خود را مشاهده کنید:",
    purchasedAccountButton: "📱 {phoneNumber}",
    noPurchasedAccounts: "⚠️ شما هنوز هیچ اکانتی خریداری نکرده‌اید.",
    viewPurchasedAccounts: "📜 مشاهده اکانت‌های خریداری شده",
    logoutSuccess: "✅ ربات با موفقیت از اکانت خارج شد.",
    logoutError: "❌ خطا در خروج ربات از اکانت. لطفاً دوباره تلاش کنید.",
    accountDetails: `📱 *مشخصات اکانت*\n\n📞 شماره: \`{phoneNumber}\`\n\n📅 تاریخ خرید: *{purchaseDate}*\n\n🔐 رمز: \`{password}\`\n\n⚠️ توجه: این اطلاعات محرمانه هستند و هرگز آن‌ها را با کسی به اشتراک نگذارید.`,
    accountDetailsNoPassword: `📱 *مشخصات اکانت*\n\n📞 شماره: \`{phoneNumber}\`\n\n📅 تاریخ خرید: *{purchaseDate}*\n\n⚠️ توجه: این اطلاعات محرمانه هستند و هرگز آن‌ها را با کسی به اشتراک نگذارید.`,
    authenticationRequired: "🔐 *برای استفاده از پرداخت کارت به کارت باید احراز هویت کنید*\n\n📜 لطفاً ابتدا شرایط احراز هویت را مطالعه کرده و سپس برای انجام فرآیند احراز هویت با پشتیبانی تماس بگیرید.",
    viewAuthenticationRules: "📜 شرایط احراز هویت",
    contactSupportForAuth: "📩 پیام به پشتیبانی",
    bankGatewayAmountPrompt: "💰 لطفاً مبلغ مورد نظر خود را به تومان ارسال کنید:",
    invalidAmount: "❌ مبلغ وارد شده معتبر نیست. لطفاً یک عدد صحیح وارد کنید.",
    amountTooLow: "❌ مبلغ وارد شده کمتر از حداقل مجاز است. حداقل مبلغ: *{minAmount}* تومان",
    amountTooHighWithoutAuth: "❌ مبلغ وارد شده بیشتر از حد مجاز بدون احراز هویت است. حداکثر مبلغ بدون احراز هویت: *{maxAmountWithoutAuth}* تومان\n\nبرای پرداخت مبالغ بیشتر، احراز هویت کنید.",
    paymentProcessing: "🔄 در حال پردازش پرداخت شما...",
    paymentRedirectMessage: "✅ در حال انتقال شما به درگاه پرداخت...",
    bankGatewayInstructionsAuthenticated: `🏦 *پرداخت از طریق درگاه بانکی*\n\nلطفاً مبلغ مورد نظر خود را به تومان ارسال کنید:\n\n💰 حداقل مبلغ پرداخت: *{minAmount}* تومان`,
    bankGatewayInstructionsUnauthenticated: `🏦 *پرداخت از طریق درگاه بانکی*\n\nلطفاً مبلغ مورد نظر خود را به تومان ارسال کنید:\n\n💰 حداقل مبلغ پرداخت: *{minAmount}* تومان\n\n⚠️ حداکثر مبلغ پرداخت بدون احراز هویت: *{maxAmountWithoutAuth}* تومان\n\nبرای حذف محدودیت پرداخت، احراز هویت کنید.`,
    paymentSuccess: "✅ پرداخت شما با موفقیت انجام شد. کد پیگیری: {refID}",
    paymentFailed: "❌ متاسفانه پرداخت شما تایید نشد. لطفاً با پشتیبانی تماس بگیرید.",
    paymentVerificationFailed: "❌ خطا در تایید پرداخت. لطفاً با پشتیبانی تماس بگیرید.",
}; 