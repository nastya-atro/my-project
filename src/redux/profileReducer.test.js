
import profileReducer, { addPostActionCreator, deletePostActionCreator } from './profileReducer'

let state = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesNumber: '22' },
        { id: 2, message: 'I am fine!', likesNumber: '18' },
    ]
}


test('new post should be added', () => {
    //1.test data
    let action = addPostActionCreator('TEXT OF NEW POST')
    
    //2.action
    let newPost = profileReducer(state, action)


    //3. expectation
    expect(newPost.posts.length).toBe(3)


  });

  test(' post should be delete', () => {
    //1.test data
    let action = deletePostActionCreator(1)
    
    //2.action
    let newPost = profileReducer(state, action)


    //3. expectation
    expect(newPost.posts.length).toBe(1)


  });

  test(' new message should be -"it-kamasutra"', () => {
    //1.test data
    let action = addPostActionCreator("it-kamasutra")
    
    //2.action
    let newPost = profileReducer(state, action)


    //3. expectation
    expect(newPost.posts[2].message).toBe("it-kamasutra")


  });



