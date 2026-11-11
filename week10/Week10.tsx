import { useState } from 'react';
import { View } from 'react-native';
import { Chip, Intro, Page, s } from '../src/components/ui';
import CreateAsyncThunkScreen from './create_async_thunk/Screen';
import CrudPostsScreen from './crud_createasyncthunk_run/Screen';

export default function Week10() {
  const [lesson, setLesson] = useState<1 | 2>(1);
  return (
    <Page scroll={false}>
      <View style={[s.content, { paddingBottom: 8, gap: 12 }]}>
        <Intro
          title="Bài viết & Async Thunk"
          subtitle="Tuần 10 · Hai bài thực hành Redux Toolkit"
        />
        <View style={s.row}>
          <Chip title="Bài 1 · Thêm bài" active={lesson === 1} onPress={() => setLesson(1)} />
          <Chip title="Bài 2 · CRUD" active={lesson === 2} onPress={() => setLesson(2)} />
        </View>
      </View>
      {lesson === 1 ? <CreateAsyncThunkScreen /> : <CrudPostsScreen />}
    </Page>
  );
}
