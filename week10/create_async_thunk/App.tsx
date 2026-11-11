
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";

// 1. Thunk gửi POST lên API
export const addPost = createAsyncThunk(
  "posts/addPost",
  async (newPost: { title: string; body: string; userId: number },
    { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPost),
        }
      );

      if (!res.ok) {
        return rejectWithValue("Không thể thêm bài viết");
      }

      return await res.json();
    } catch (error) {
      return rejectWithValue("Lỗi kết nối API");
    }
  }
);

// 2. Tạo Slice
const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [] as any[],
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPost.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift(action.payload);
      })
      .addCase(addPost.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Có lỗi xảy ra";
      });
  },
});

// 3. Tạo Store
const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
  },
});

// 4. Giao diện
function PostScreen() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const dispatch = useDispatch<any>();
  const { posts, loading, error } = useSelector(
    (state: any) => state.posts
  );

  const handleAddPost = () => {
    if (!title.trim() || !body.trim()) {
      return;
    }

    dispatch(
      addPost({
        title: title.trim(),
        body: body.trim(),
        userId: 1,
      })
    )
      .unwrap()
      .then(() => {
        setTitle("");
        setBody("");
      })
      .catch(() => {});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>QUẢN LÝ BÀI VIẾT</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập tiêu đề"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Nhập nội dung"
        value={body}
        onChangeText={setBody}
        multiline
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleAddPost}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Đang thêm..." : "Thêm bài viết"}
        </Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="blue" />}

      {error !== "" && (
        <Text style={styles.error}>{error}</Text>
      )}

      <Text style={styles.subheading}>Danh sách bài viết</Text>

      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text>Chưa có bài viết nào</Text>
        }
      />
    </View>
  );
}

// 5. App chính
export default function App() {
  return (
    <Provider store={store}>
      <PostScreen />
    </Provider>
  );
}

// 6. Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  textArea: {
    height: 90,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  subheading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  post: {
    padding: 15,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
