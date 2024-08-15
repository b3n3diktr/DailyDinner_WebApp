import {
    SecretsManagerClient,
    GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import dotenv from 'dotenv';

dotenv.config();

class SecretsManager {
    private client: SecretsManagerClient;
    private secrets: { [key: string]: string } = {};

    constructor() {
        this.client = new SecretsManagerClient({
            region: process.env.AWS_REGION ?? "eu-north-1",
        });
    }

    // Method to retrieve secret by ARN
    async loadSecret(secretArn: string, versionId?: string): Promise<void> {
        try {
            const response = await this.client.send(
                new GetSecretValueCommand({
                    SecretId: "arn:aws:secretsmanager:eu-north-1:216989134237:secret:test/dailydinner/.env-MSD73V",
                    VersionId: "11fbf3e2-c3a7-4712-abc1-1b6fa2ebe542",
                    VersionStage: "AWSCURRENT"
                })
            );

            if (response.SecretString) {
                this.secrets = JSON.parse(response.SecretString);
                console.log("Secrets loaded successfully");
            } else {
                throw new Error("SecretString is empty");
            }
        } catch (error) {
            console.error("Error retrieving secret:", error);
        }
    }

    // Method to get a secret value by key
    getSecret(key: string): string | undefined {
        return this.secrets[key];
    }
}

// Create an instance of the SecretsManager
const secretsManager = new SecretsManager();

// Fetch your secrets from AWS Secrets Manager
(async () => {
    const secretArn = process.env.SECRET_ARN ?? '';
    await secretsManager.loadSecret(secretArn);
})();

export const DEVELOPMENT = process.env.NODE_ENV === 'development';
export const PRODUCTION = process.env.NODE_ENV === 'production';

// If the secret variables are not loaded from AWS, fallback to .env
export const SERVER_HOSTNAME = secretsManager.getSecret("SERVER_HOSTNAME") ?? process.env.SERVER_HOSTNAME ?? 'localhost';
export const SERVER_PORT = secretsManager.getSecret("SERVER_PORT") ?? process.env.SERVER_PORT ?? '1337';
export const MONGO_URI = secretsManager.getSecret("MONGO_URI") ?? process.env.MONGO_URI ?? 'mongodb://localhost';
export const JWT_SECRET = secretsManager.getSecret("JWT_SECRET") ?? process.env.JWT_SECRET;
export const API_URL = secretsManager.getSecret("API_URL") ?? process.env.API_URL ?? 'http://localhost:1337';
export const EMAIL_USER = secretsManager.getSecret("EMAIL_USER") ?? process.env.EMAIL_USER ?? '';
export const EMAIL_PASS = secretsManager.getSecret("EMAIL_PASS") ?? process.env.EMAIL_PASS ?? '';

// Export an object to access these values
export const server = {
    SERVER_HOSTNAME,
    SERVER_PORT,
    MONGO_URI,
    JWT_SECRET,
    API_URL,
    EMAIL_USER,
    EMAIL_PASS,
};
