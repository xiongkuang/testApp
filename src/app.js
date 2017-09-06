"use strict"
import {createStore} from 'redux';


//STEP3 define reducers
const reducer = function (state={books:[]}, action) {
    switch (action.type){
        // case "INCREMENT":
        //     return state + action.payload;
        //     break;
        // case "DECREMENT":
        //     return state - action.payload;
        //     break;
        case "POST_BOOK":
            // let books = state.books.concat(action.payload);
            // return {books};
            return {books:[...state.books, ...action.payload]}
            break;
        case "DELETE_BOOK":
            //create a copy of the current array of books
            const currentBookToDelete = [...state.books]
            //determine at which index in books array is the book to be deleted
            const indexToDelete = currentBookToDelete.findIndex(
                function (book) {
                    return book.id === action.payload.id;
                }
            )

            //use slice to remove the book at the specified index
            return {books:[...currentBookToDelete.slice(0, indexToDelete),
                ...currentBookToDelete.slice(indexToDelete + 1)]}
            break;
        case "UPDATE_BOOK":
            const curretBookToUpdate = [...state.books]

            const indexToUpdate = curretBookToUpdate.findIndex(
                function (book) {
                    return book.id === action.payload.id;
                }
            )

            const newBookToUpdate = {
                ...curretBookToUpdate[indexToUpdate],
                title: action.payload.titleudd
            }
    }
    return state;
}



//STEP1 create the store
const store = createStore(reducer);

store.subscribe(function () {
    console.log('current state is ', store.getState());
    // console.log('current price is ', store.getState()[1].price);
})



//STEP2 create and dispatch actions
// store.dispatch({type:"INCREMENT", payload: 1})
//
// store.dispatch({type:"INCREMENT", payload: 1})
//
// store.dispatch({type:"DECREMENT", payload: 1})

store.dispatch({
    type:"POST_BOOK",
    payload: [
        {
        id:1,
        title:'this is the book title',
        description: 'this is the book description',
        price:33
        },
        {
            id:2,
            title:'this is the second book title',
            description: 'this is the second book description',
            price:30
        }
    ]
})

//Second dispatch action
store.dispatch({
    type:"POST_BOOK",
    payload: {
        id:3,
        title:'this is the 3rd book title',
        description: 'this is the 3rd book description',
        price:77
    }
})

//Delete book
store.dispatch({
    type:"DELETE_BOOK",
    payload: {
        id:1
    }
})


//update book
store.dispatch({
    type:"UPDATE_BOOK",
    payload: {
        id:2,
        title:'react aaaaaaaaaa'
    }
})