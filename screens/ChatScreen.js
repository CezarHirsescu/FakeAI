import { useState } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import { Button1, TextInput1 } from "../components";
import { COLORS, FONTS } from "../constants";

const ChatScreen = ({ chatID, AI, user1, user2 }) => {
  const [messages, setMessages] = useState([
    { user: 0, text: "Hello there" },
    { user: 1, text: "General Kenobi... You are a bold one." },
    { user: 1, text: "Kill Him..." },
    { user: 0, text: "*defeats droid enemies with ease" },
    { user: 1, text: "Back away! I will deal with this jedi slime myself." },
    { user: 0, text: "Your move." },
    {
      user: 1,
      text: "You fool! I've been trained in your jedi arts by count Dooku himself...",
    },
    { user: 1, text: "Attack, Kenobi..." },
    // {
    //   user: 0,
    //   text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et sem in ante congue malesuada. Pellentesque aliquam erat in consectetur euismod. Fusce a enim sagittis, ultrices lorem sed, feugiat nunc. Mauris eget arcu ipsum. Mauris sit amet cursus massa. Nunc vulputate varius mi ut tincidunt. Donec eleifend nisl magna, nec porta leo accumsan nec. Donec nibh massa, eleifend sodales est et, egestas lobortis purus. In a quam pretium, aliquet turpis a, porta justo. Fusce commodo efficitur convallis. Nam mattis nunc neque, sed sagittis turpis ornare vitae. Donec consectetur rhoncus turpis, a dapibus eros commodo quis.Proin nec nibh leo. Duis semper semper ultricies. Nam venenatis nisi sed neque viverra ornare. Proin non vestibulum mauris. In ornare varius ex quis porta. Integer vitae finibus urna. Vestibulum euismod elementum feugiat. Suspendisse vulputate tempus lorem eu consequat. Vivamus pharetra condimentum viverra. Sed lobortis, libero sit amet ultrices porta, sem ipsum commodo velit, vel posuere orci odio at dui. Praesent sit amet mauris mi. Aenean aliquet convallis augue, nec auctor odio efficitur at. Aenean nec leo bibendum est aliquam efficitur.Ut pellentesque finibus fermentum. Etiam sed lobortis ante. Maecenas sit amet diam a magna auctor malesuada ut eu mi. Sed viverra volutpat imperdiet. Donec egestas at felis nec sagittis. Etiam vitae faucibus urna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris dignissim magna sem, at interdum lectus iaculis pharetra. In felis magna, consectetur ac lobortis ut, semper sit amet metus. Nullam a risus odio. In maximus tristique ipsum a mollis. Duis efficitur magna ut consequat faucibus.Aliquam imperdiet, neque ut consequat dictum, tellus diam cursus ex, a consectetur neque est quis enim. Ut tempus sem et metus auctor aliquam a id turpis. Pellentesque sit amet porttitor massa. Maecenas leo lectus, varius ac dolor pretium, iaculis viverra turpis. Nulla vitae feugiat turpis. Cras luctus mauris eu placerat sollicitudin. Mauris a neque odio. Fusce tristique lacinia felis vel facilisis. Mauris non mi dui. Sed quis nulla quis mauris dapibus viverra sed sit amet nisl. Nullam a tempus est. Curabitur in erat at enim dignissim pretium vel vitae elit. Cras fringilla mattis dui, vel lobortis enim tempus sed. Integer dignissim, lorem nec elementum fermentum, quam nisi imperdiet ligula, eget faucibus magna sapien vitae ligula. In semper, urna eget vehicula aliquet, massa velit interdum diam, sed sagittis nibh lacus sit amet lectus. Ut et bibendum quam.Phasellus quis posuere felis, vel tincidunt lectus. Mauris bibendum dui eu tincidunt commodo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas in sagittis odio, ut elementum sapien. Morbi dapibus, ante et tempus mattis, urna mi blandit purus, quis commodo erat eros sed augue. Nullam suscipit mi non ex dignissim, a ultrices lectus lobortis. Duis tincidunt malesuada lacus aliquet hendrerit. Quisque congue sem nec massa semper, quis pulvinar augue viverra. Phasellus luctus est ante, in maximus ante commodo vehicula. Maecenas euismod tellus massa, ut pulvinar velit ullamcorper non. Donec congue suscipit suscipit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla ultrices ligula quis quam pretium commodo. Suspendisse potenti.",
    // },
  ]);
  const [newMessage, setNewMessage] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Button1 onPress={() => {}} title={"Exit"} width={73} />
      </View>
      <FlatList
        style={styles.messageContainer}
        data={messages}
        renderItem={({ item }) => (
          <View
            style={[
              // styles.messageWrapper,
              item.user === 0
                ? styles.messageWrapperSent
                : styles.messsageWrapperRecieved,
            ]}
          >
            <Text
              style={[
                item.user === 0 ? styles.messageSent : styles.messageReceived,
                styles.message,
              ]}
            >
              {item.text}
            </Text>
          </View>
        )}
      />
      <View style={styles.bottomBar}>
        <TextInput1
          value={newMessage}
          setValue={setNewMessage}
          placeholder={"Type Something..."}
        />
        <Button1
          onPress={() => {
            const arr = [...messages];
            arr.push({ user: 0, text: newMessage });
            setMessages(arr);
            setNewMessage("");
          }}
          title={"Send"}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderStyle: "dashed",
    // borderColor: "red",
    // borderWidth: "2px",
    flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.darkGray
  },
  topBar: {
    width: "100%",
  },
  messageContainer: {
    width: "100%",
    backgroundColor: "#111111",
  
  },
  messageWrapper: {
    // borderStyle: "dashed",
    // borderColor: "red",
    // borderWidth: "2px",
  },
  messageWrapperSent: {
    alignItems: "flex-end",
  },
  messsageWrapperRecieved: {
    alignItems: "flex-start",
  },
  message: {
    maxWidth: 250,
    fontFamily: FONTS.Roboto_Mono_Regular,
    color: "white",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    overflow: "hidden"  // this fixes the border radius on ios, idk why lol!
  },
  messageSent: {
    backgroundColor: "#1982FC", // imessage blue

  },
  messageReceived: {
    backgroundColor: COLORS.gray,
  },
  bottomBar: {
    paddingHorizontal: 10,
    flexDirection: "row",
  },
});

export default ChatScreen;
