import { useEffect, useState } from 'react';
import { View, Button, FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';

export default function App() {

    [quotes, setQuotes] = useState([])

    useEffect(() => {
        getQuotes();
    }, [])

    const Quote = props => {
        return (
            <SafeAreaView style={styles.quote_view}>
                <Text style={styles.quote}>
                    {props.quote}
                </Text>
                <Text style={styles.author}>
                    - {props.author}
                </Text>
            </SafeAreaView>
        )
    }
    
    const getQuotes = () => {
        return (
            fetch("https://programming-quotesapi.vercel.app/api/bulk")
                .then(response => response.json())
                .then(data => {
                    for (let i = 0; i < 10; i++) {
                        data[i].id = i;
                    }
                    setQuotes(data);
                })
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Programming Quotes
            </Text>

            <View style={styles.button_view}>
                <Button title='Get Quotes' color={"green"} onPress={() => getQuotes()} />
            </View>

            <FlatList
                data={quotes}

                keyExtractor={(item) => item.id}

                renderItem={({ item }) => {
                    return <Quote quote={item.quote} author={item.author} />
                }}

            />
        </SafeAreaView>
    );    
}



const styles = StyleSheet.create({
    quote: {
        fontSize: 20,
        marginRight: 10,
    },
    author: {
        fontSize: 16,
        flex: 1,
        alignSelf: "flex-end",
        marginRight: 8,
    },
    quote_view: {
        margin: 2,
        padding: 4,
        backgroundColor: "lightgreen"
    },
    container: {
        marginTop: 50,
        paddingLeft: 8,
        paddingRight: 8,
    },
    title: {
        fontSize: 30,
        alignSelf: "center",
        marginBottom: 20,
        color: "darkgreen",
        fontFamily: "monospace",
    },
    button_view: {
        marginBottom: 20,
    }
});
