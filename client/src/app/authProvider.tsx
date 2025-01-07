import { Authenticator, Text, View } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import Image from "next/image";

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "",
            userPoolClientId:
                process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID || "",
        },
    },
});

const formFields = {
    signUp: {
        username: {
            order: 1,
            placeholder: "Choose a username",
            label: "Username",
            inputProps: { required: true },
        },
        email: {
            order: 1,
            placeholder: "Enter your email address",
            label: "Email",
            inputProps: { type: "email", required: true },
        },
        password: {
            order: 3,
            placeholder: "Enter your password",
            label: "Password",
            inputProps: { type: "password", required: true },
        },
        confirm_password: {
            order: 4,
            placeholder: "Confirm your password",
            label: "Confirm Password",
            inputProps: { type: "password", required: true },
        },
    },
};

const AuthProvider = ({ children }: any) => {
    return (
        <div>
            <Authenticator formFields={formFields}
                components={{
                    Header() {
                        return (
                            <>
                                <View className="flex justify-center align-center">
                                    <Image
                                        alt="MindHive Logo"
                                        src="https://project-management-mind-hive-s3-images.s3.eu-west-3.amazonaws.com/auth-logo.jpg"
                                        height={120}
                                        width={120}
                                    />
                                </View>
                                <Text className="flex justify-center text-xl text-[#047d95] font-mono font-semibold pb-8">The Management Hub you need</Text>
                            </>
                        );
                    },
                }}
            >
                {({ user }: any) =>
                    user ? (
                        <div>{children}</div>
                    ) : (
                        <div>
                            <h1>Please sign in below:</h1>
                        </div>
                    )
                }
            </Authenticator>
        </div>
    );
};

export default AuthProvider;