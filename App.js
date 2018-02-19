import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { observer } from 'mobx-react';
import { types } from 'mobx-state-tree';

const Book = types
  .model('Book', { title: types.string });

const BookStore = types
  .model({ books: types.array(Book) })
  .actions(self => ({
    addBook: book => self.books.push(book)
  }))
  .create({ books: [{ title: 'Moby Dick' }] });

@observer
export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity
          style={{ backgroundColor: 'red', padding: 10, margin: 10}}
          onPress={() => BookStore.addBook({ title: 'Book Title' })}
        >
          <Text>Add Book Title</Text>
        </TouchableOpacity>
        {BookStore.books.map((book, index) => (
          <Text key={index}>{book.title}</Text>
        ))}
      </View>
    );
  }
}
