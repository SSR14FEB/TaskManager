import mongoose from "mongoose";
const connection = async () => {
    try {
        const mongoUri = `${process.env.MONGODB_URI}/${process.env.DB_NAME}`;
        const connectionInstance = await mongoose.connect(mongoUri);
        const result = await mongoose.connection.db
            ?.admin()
            .command({ ping: 1 });
        console.log("Ping result", result);

        await Promise.all(
            Object.values(mongoose.model).map((model) => model.createIndex())
        );
        console.log("All indexed are insured")
        console.log("Database connected successfully");
    } catch (error) {
        console.log("connection string problem", error, mongoUri);
    }
};
export { connection };
