
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";

import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { Provider, useDispatch, useSelector } from "react-redux";

// ========================================
// PHẦN 1: THIẾT KẾ STATE VÀ API
// ========================================

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

type NewPost = Omit<Post, "id">;

type PostsState = {
  items: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  deletingId: number | null;
};

const initialState: PostsState = {
  items: [],
  status: "idle",
  error: null,
  deletingId: null,
};

const API = "https://jsonplaceholder.typicode.com/posts";

// Hàm dùng chung để gọi API
const request = async (
  url: string,
  options?: RequestInit
) => {
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error(`Lỗi ${res.status}`);
  }

  if (res.status === 204) return null;

  return await res.json();
};

// ========================================
// PHẦN 2: KHAI BÁO 4 ASYNC THUNK
// ========================================

// 2.1 READ - Lấy danh sách bài viết
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async () => {
    return (await request(`${API}?_limit=10`)) as Post[];
  }
);

// 2.2 CREATE - Thêm bài viết
export const addPost = createAsyncThunk(
  "posts/addPost",
  async (newPost: NewPost) => {
    return (await request(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })) as Post;
  }
);

// 2.3 UPDATE - Sửa bài viết
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (post: Post) => {
    return (await request(`${API}/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })) as Post;
  }
);

// 2.4 DELETE - Xóa bài viết
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: number) => {
    await request(`${API}/${id}`, {
      method: "DELETE",
    });

    return id;
  }
);

// ========================================
// PHẦN 3: CREATE SLICE + EXTRA REDUCERS
// ========================================

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // READ
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })

      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Lỗi tải dữ liệu";
      })

      // CREATE
      .addCase(addPost.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })

      // UPDATE
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (p) => p.id === action.payload.id
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      // DELETE: Đang xóa
      .addCase(deletePost.pending, (state, action) => {
        state.deletingId = action.meta.arg;
      })

      // DELETE: Xóa thành công
      .addCase(deletePost.fulfilled, (state, action) => {
        state.deletingId = null;

        state.items = state.items.filter(
          (p) => p.id !== action.payload
        );
      })

      // DELETE: Xóa thất bại
      .addCase(deletePost.rejected, (state) => {
        state.deletingId = null;
      });
  },
});

// ========================================
// PHẦN 4: STORE VÀ SELECTORS
// ========================================

const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const selectPosts = (state: RootState) =>
  state.posts.items;

export const selectPostsStatus = (state: RootState) =>
  state.posts.status;

export const selectPostsError = (state: RootState) =>
  state.posts.error;

export const selectDeletingId = (state: RootState) =>
  state.posts.deletingId;

// ========================================
// PHẦN 4: GIAO DIỆN POST MANAGER
// ========================================

function PostManager() {
  const dispatch = useDispatch<AppDispatch>();

  const posts = useSelector(selectPosts);
  const status = useSelector(selectPostsStatus);
  const error = useSelector(selectPostsError);
  const deletingId = useSelector(selectDeletingId);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  // READ: Lấy dữ liệu khi mở ứng dụng
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  // CREATE hoặc UPDATE
  const handleSubmit = async () => {
    if (!title.trim() || !body.trim()) {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    setSaving(true);

    try {
      if (editingId !== null) {
        // UPDATE
        const oldPost = posts.find((p) => p.id === editingId);

        if (!oldPost) {
          throw new Error("Không tìm thấy bài viết");
        }

        await dispatch(
          updatePost({
            ...oldPost,
            title: title.trim(),
            body: body.trim(),
          })
        ).unwrap();

        Alert.alert("Thành công", "Đã cập nhật bài viết");
      } else {
        // CREATE
        await dispatch(
          addPost({
            title: title.trim(),
            body: body.trim(),
            userId: 1,
          })
        ).unwrap();

        Alert.alert("Thành công", "Đã thêm bài viết");
      }

      setTitle("");
      setBody("");
      setEditingId(null);
    } catch (err: any) {
      Alert.alert(
        "Thao tác thất bại",
        err?.message || String(err)
      );
    } finally {
      setSaving(false);
    }
  };

  // Chọn bài viết để sửa
  const startEdit = (post: Post) => {
    setEditingId(post.id);
    setTitle(post.title);
    setBody(post.body);
  };

  // Hủy chỉnh sửa
  const cancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setBody("");
  };

  // DELETE
  const handleDelete = async (id: number) => {
    try {
      await dispatch(deletePost(id)).unwrap();

      if (editingId === id) {
        cancelEdit();
      }

      Alert.alert("Thành công", "Đã xóa bài viết");
    } catch (err: any) {
      Alert.alert(
        "Xóa thất bại",
        err?.message || String(err)
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        QUẢN LÝ BÀI VIẾT - CRUD
      </Text>

      {/* FORM THÊM / SỬA */}
      <View style={styles.form}>
        <Text style={styles.subheading}>
          {editingId !== null
            ? "Chỉnh sửa bài viết"
            : "Thêm bài viết mới"}
        </Text>

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
          style={styles.addButton}
          onPress={handleSubmit}
          disabled={saving}
        >
          <Text style={styles.buttonText}>
            {saving
              ? "Đang lưu..."
              : editingId !== null
              ? "Cập nhật"
              : "Thêm bài viết"}
          </Text>
        </TouchableOpacity>

        {editingId !== null && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={cancelEdit}
            disabled={saving}
          >
            <Text style={styles.buttonText}>Hủy</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.subheading}>
        Danh sách bài viết ({posts.length})
      </Text>

      {/* TRẠNG THÁI TẢI DANH SÁCH */}
      {status === "loading" && (
        <ActivityIndicator size="large" color="blue" />
      )}

      {status === "failed" && (
        <View>
          <Text style={styles.error}>Lỗi: {error}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => dispatch(fetchPosts())}
          >
            <Text style={styles.buttonText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* DANH SÁCH BÀI VIẾT */}
      {status === "succeeded" && (
        <FlatList
          data={posts}
          keyExtractor={(item, index) =>
            `${item.id}-${index}`
          }
          ListEmptyComponent={
            <Text>Không có bài viết nào</Text>
          }
          renderItem={({ item }) => (
            <View style={styles.post}>
              <Text style={styles.postTitle}>
                {item.title}
              </Text>

              <Text style={styles.postBody}>
                {item.body}
              </Text>

              <View style={styles.row}>
                {/* UPDATE */}
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => startEdit(item)}
                  disabled={saving}
                >
                  <Text style={styles.buttonText}>Sửa</Text>
                </TouchableOpacity>

                {/* DELETE */}
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item.id)}
                  disabled={deletingId !== null}
                >
                  <Text style={styles.buttonText}>
                    {deletingId === item.id
                      ? "Đang xóa..."
                      : "Xóa"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

// ========================================
// APP CHÍNH - REDUX PROVIDER
// ========================================

export default function App() {
  return (
    <Provider store={store}>
      <PostManager />
    </Provider>
  );
}

// ========================================
// STYLES
// ========================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
    paddingTop: 40,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#222",
  },
  subheading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  form: {
    padding: 15,
    backgroundColor: "#f3f4f6",
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 10,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  addButton: {
    backgroundColor: "#2563eb",
    padding: 13,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  cancelButton: {
    backgroundColor: "#6b7280",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  post: {
    backgroundColor: "#f9fafb",
    padding: 15,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    marginBottom: 12,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  postBody: {
    color: "#444",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  editButton: {
    backgroundColor: "#f59e0b",
    padding: 10,
    borderRadius: 6,
    flex: 1,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#dc2626",
    padding: 10,
    borderRadius: 6,
    flex: 1,
    alignItems: "center",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});
