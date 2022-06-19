import { v4 as uuid } from "uuid";
import request from "supertest";
import { server } from "../../app";
import User from "../users/user.model";
import { convertToString } from "../../common/utils";


//https://medium.com/@natnael.awel/how-to-setup-testing-for-typescript-with-express-js-example-83d3efbb6fd4


describe("First Scenario", () => {
    test("test GET, POST, PUT, DELETE methods", async () => {
        const resGet = await request(server).get("/api/users");
        expect(resGet.body).toEqual([]);

        const newUser = new User({
            username: 'Ivan',
            age: 24,
            hobbies: ["chess", "tennis"],
          });
        const resPost = await request(server).post("/api/users").send(newUser);
        const createdUser = resPost.body;        
        expect(compareUsersWithoutId(newUser, createdUser)).toEqual(true);
                
        const idCreatedUser = createdUser.id;
        const userGetById = await (await request(server).get(`/api/users/${idCreatedUser}`)).body;
        console.log("userGetById = " + JSON.stringify(userGetById));
        expect(compareUsers(createdUser, userGetById)).toEqual(true);

        const newUserForPut = new User({
            username: 'Ivan2',
            age: 28,
            hobbies: ["soccer", "tennis"],
        });

        const resPut = await request(server)
            .put(`/api/users/${idCreatedUser}`)
            .send(newUserForPut);
        const updatedUser = resPut.body;
        expect(compareUsersWithoutId(newUserForPut, updatedUser)).toEqual(true);
        expect(idCreatedUser === updatedUser.id).toEqual(true);

        const resDelete = await request(server).delete(`/api/users/${idCreatedUser}`);
        expect(resDelete.statusCode).toEqual(204);
        const resAfterDelete = await request(server).delete(`/api/users/${idCreatedUser}`);
        expect(resAfterDelete.statusCode).toEqual(404);          
    });
});

describe("Second Scenario", () => {
    test("test GET, POST, PUT, DELETE methods", async () => {
        const newUser = new User({ username: 'Ivan', age: 24, hobbies: ["chess", "tennis"] });
        await request(server).post("/api/users").send(newUser);
        const newUser2 = new User({ username: 'Peter', age: 28, hobbies: ["soccer"] });
        await request(server).post("/api/users").send(newUser2);
        const resGetAllUsers = await request(server).get("/api/users");
        const bodyGetAllUsers = resGetAllUsers.body as Array<User>;
        expect(bodyGetAllUsers.length).toEqual(2);

        const firstUser =  bodyGetAllUsers[0]!;
        const firstUserId = convertToString(firstUser?.id);
        const secondUser =  bodyGetAllUsers[1]!;
        const secondUserId = convertToString(secondUser?.id);
        const resGetUserByBadUuidId = await request(server).get(`/api/users/${firstUserId.concat("1")}`);
        expect(resGetUserByBadUuidId.body.message).toEqual("User id is invalid (not uuid)");
        expect(resGetUserByBadUuidId.statusCode).toEqual(400);
        
        const resGetUserByBadId = await request(server).get(`/api/users/${modifyUuid(firstUserId)}`);
        expect(resGetUserByBadId.body.message).toEqual("User Not Found");
        expect(resGetUserByBadId.statusCode).toEqual(404);

        firstUser.age = 32;
        const resPut1 = await request(server)
            .put(`/api/users/${firstUserId}`)
            .send(firstUser);
        expect(resPut1.statusCode).toEqual(200);
        const resDelete = await request(server).delete(`/api/users/${firstUserId}`);
        expect(resDelete.statusCode).toEqual(204);
        firstUser.age = 33;
        const resPut2 = await request(server)
            .put(`/api/users/${firstUserId}`)
            .send(firstUser);
            expect(resPut2.statusCode).toEqual(404);

        const resDelete2 = await request(server).delete(`/api/users/${modifyUuid(secondUserId)}`);
        expect(resDelete2.statusCode).toEqual(404);
        const resDelete3 = await request(server).delete(`/api/users/${secondUserId.concat("1")}`);
        expect(resDelete3.statusCode).toEqual(400);
        const resDelete4 = await request(server).delete(`/api/users/${secondUserId}`);
        expect(resDelete4.statusCode).toEqual(204);        
    });
});

describe("Third Scenario", () => {
    test("test GET, POST, DELETE methods",async () => {
        const newUser = new User({
            username: 'Alex',
            age: 32,
            hobbies: ["soccer", "tennis"],
          });
        const resPost2 = await request(server).post("/api/users").send(newUser);
        const createdUser = resPost2.body;
        const createdUserId = createdUser.id;
        expect(resPost2.statusCode).toEqual(201);
        
        const newId = uuid();
        const resGetUserByNewId = await request(server).get(`/api/users/${newId}`);
        expect(resGetUserByNewId.statusCode).toEqual(404);
        expect(resGetUserByNewId.body.message).toEqual("User Not Found");

        const resGetUserById2 = await request(server).get(`/api/users/${createdUserId}`);
        const GotUser = resGetUserById2.body;
        expect(compareUsersWithoutId(GotUser, createdUser)).toEqual(true);
        
        const resDelete = await request(server).delete(`/api/users/${createdUserId}`);
        expect(resDelete.statusCode).toEqual(204);
    });
});

function compareUsersWithoutId(first: User, second: User): Boolean {
    const firstCopy = JSON.parse(JSON.stringify(first));
    const secondCopy = JSON.parse(JSON.stringify(second));
    const propId = "id";
    delete firstCopy[propId];
    delete secondCopy[propId];
    return compareUsers(firstCopy, secondCopy);
}

function compareUsers(first: User, second: User): Boolean {
    return JSON.stringify(first)===JSON.stringify(second);
}

function modifyUuid(id: string): string {    
    const array = id.split("");
    const indexFirsElement = 0;
    if(array[indexFirsElement] !== "a") {
        array[indexFirsElement] = "a";
    }else {
        array[indexFirsElement] = "b";
    }
    const modifiedUuid = array.join("");    
    return modifiedUuid;
}
