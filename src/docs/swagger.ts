import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        version: "v0.0.1",
        title: "Event API Documentation",
        description: "Event API Documentation",
    },
    servers: [
        {
            url: "http://localhost:3000/api",
            description: "Development server",
        },
        {
            url: "https://be-event-pearl.vercel.app/api",
            description: "Production Server"
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
            }
        },
        schemas: {
            LoginRequest: {
                identifier: "rizkyathoriq19",
                password: "12341234"
            },
            RegisterRequest: {
                fullName: "member2025",
                username: "member2025",
                email: "member2025@yopmail.com",
                password: "Member2025!",
                confirmPassword: "Member2025!",
                },
            ActivationRequest: {
                code: "abcdef",
            }
        }
    }
}

const outputFile = "./swagger_output.json";
const endPointsFiles = ["../routes/api.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endPointsFiles, doc);