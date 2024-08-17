import {
    SecretsManagerClient,
    GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

export class SecretsManager {
    private client: SecretsManagerClient;
    private secrets: { [key: string]: string } = {};

    constructor() {
        this.client = new SecretsManagerClient({
            region: "eu-central-1",
        });
    }

    async loadSecret(): Promise<void> {
        try {
            const response = await this.client.send(
                new GetSecretValueCommand({
                    SecretId: "arn:aws:secretsmanager:eu-central-1:216989134237:secret:test/dailydinner/.env-MSD73V",
                    VersionId: "11c88925-c361-473a-a702-53f13be6d969",
                    VersionStage: "AWSCURRENT"
                })
            );

            if (response.SecretString) {
                this.secrets = JSON.parse(response.SecretString);
                console.log("Secrets loaded successfully");
            } else {
                console.log("SecretString is empty");
            }
        } catch (error) {
            console.error("Error retrieving secret:", error);
        }
    }

    getSecret(key: string): string | undefined {
        return this.secrets[key];
    }
}

const secretsManager = new SecretsManager();

export const loadSecrets = async () => {
    await secretsManager.loadSecret(); // Ensure the secrets are loaded
    return {
        SERVER_HOSTNAME: secretsManager.getSecret("SERVER_HOSTNAME") ?? '',
        SERVER_PORT: parseInt(secretsManager.getSecret("SERVER_PORT") ?? '', 10),
        MONGO_URI: secretsManager.getSecret("MONGO_URI") ?? '',
        JWT_SECRET: secretsManager.getSecret("JWT_SECRET") ?? '',
        API_URL: secretsManager.getSecret("API_URL") ?? '',
        EMAIL_USER: secretsManager.getSecret("EMAIL_USER") ?? '',
        EMAIL_PASS: secretsManager.getSecret("EMAIL_PASS") ?? '',
    };
};

export const PRODUCTION = 'development';

export const SERVER_HOSTNAME = secretsManager.getSecret("SERVER_HOSTNAME") ?? '';
export const SERVER_PORT = secretsManager.getSecret("SERVER_PORT") ?? '';
export const MONGO_URI = secretsManager.getSecret("MONGO_URI") ?? '';
export const JWT_SECRET = secretsManager.getSecret("JWT_SECRET") ?? '';
export const API_URL = secretsManager.getSecret("API_URL") ?? '';
export const EMAIL_USER = secretsManager.getSecret("EMAIL_USER") ?? '';
export const EMAIL_PASS = secretsManager.getSecret("EMAIL_PASS") ?? '';

export const server = {
    SERVER_HOSTNAME,
    SERVER_PORT,
    MONGO_URI,
    JWT_SECRET,
    API_URL,
    EMAIL_USER,
    EMAIL_PASS,
};
