import type { PropsWithChildren } from 'react';
import { Text } from 'react-native';
import { Card, s } from '../src/components/ui';
import type { PostItem } from './types';

export default function PostCard({ post, children }: PropsWithChildren<{ post: PostItem }>) {
  return (
    <Card>
      <Text style={s.muted}>
        ID API: {post.id} ·{' '}
        {post.origin === 'local' ? 'Bài tạo trong phiên' : `Người dùng ${post.userId}`}
      </Text>
      <Text style={s.heading}>{post.title}</Text>
      <Text style={s.text}>{post.body}</Text>
      {children}
    </Card>
  );
}
