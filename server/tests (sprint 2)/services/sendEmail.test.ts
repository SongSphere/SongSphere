// set env variable

import User, { IUser } from "../../db/user";
import * as dotenv from "dotenv";
dotenv.config();

// import package
import mongoose from "mongoose";

import createApp from "../../app";

// import db
import { connect } from "../../db/connect";
import { addInvitation, deleteInvitation, sendInvitationEmail  } from "../../services/party-room";

// This creates a new backend in the database
const app = createApp("testSendEmail");

describe("Testing send email services", () => {

    beforeAll(async () => {
        await connect("testSendEmail");
    });

    afterEach(async () => {
    
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test("Testing send email", async () => {

        sendInvitationEmail("something" , "David", "davidcollegeadmission@gmail.com");
        
        expect(0).toContain(0);
    });

});