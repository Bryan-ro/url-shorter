interface PasswordConfigProps {
    length: number;
    lowerCase?: boolean;
    upperCase?: boolean;
    numbers?: boolean;
}


export default (config: PasswordConfigProps) => {
    let passwordCharactersOptions = "";

    if (config.lowerCase) {
        passwordCharactersOptions += "abcdefghijklmnopqrstuvwxyz";
    }
    if (config.upperCase) {
        passwordCharactersOptions += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (config.numbers) {
        passwordCharactersOptions += "1234567890";
    }

    let generatedPass = "";

    for (let i = 0; i < config.length; i++) {
        const random = Math.floor(Math.random() * passwordCharactersOptions.length);

        generatedPass += passwordCharactersOptions[random];
    }

    return generatedPass;
};
