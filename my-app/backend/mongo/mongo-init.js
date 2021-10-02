/* eslint-disable no-undef */
db.createUser({
    user: 'the_username',
    pwd: 'the_password',
    roles: [
        {
            role: 'dbOwner',
            db: 'bloglist',
        },
    ],
})

db.createCollection('blogs')
db.createCollection('users')

db.users.insert({ username: 'tester', passwordHash: 'testpw' })