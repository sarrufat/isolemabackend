export class AccountToken {
    public IdAccount: string;
    public EMail: string;
    public Token: string;

    public static getAccountTokenBySource(source: any, secret: string): string {

        return WebToken.createToken(source, secret);
    }

}

export class WebToken {

    private static _jwt: any = require('jwt-simple');

    public static createToken(account: any, secret: string): string {

        var token = this._jwt.encode(account, secret);

        return token;
    }
}