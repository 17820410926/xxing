/* eslint-disable */
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/Screen';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#7B6EF6',
  secondary: '#5CE0D8',
  accent: '#F2A7E0',
  background: '#0D1026',
  card: 'rgba(255,255,255,0.06)',
  cardBorder: 'rgba(255,255,255,0.08)',
  textPrimary: '#EEEAF6',
  textSecondary: '#8E8BA3',
};

// 树洞帖子
const POSTS = [
  {
    id: 1,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    nickname: '匿名的小鹿',
    time: '2小时前',
    content: '今天加班到很晚，一个人走在回家的路上，突然觉得好孤独。但想想每天都有在努力，也是一种成长吧。给自己比个心~',
    mood: '😔',
    moodText: '低落',
    likes: 128,
    comments: 23,
    isLiked: false,
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=400',
  },
  {
    id: 2,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    nickname: '夜行者',
    time: '4小时前',
    content: '裸辞三个月了，一直在家焦虑。不知道自己还能做什么...但今天终于约到了一个面试，希望会好吧！',
    mood: '😰',
    moodText: '焦虑',
    likes: 256,
    comments: 45,
    isLiked: true,
    image: null,
  },
  {
    id: 3,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    nickname: '向日葵',
    time: '6小时前',
    content: '终于鼓起勇气和爸妈说出了心里话，他们比我想象中理解我很多。原来沟通真的能解决问题！',
    mood: '😊',
    moodText: '愉悦',
    likes: 512,
    comments: 67,
    isLiked: false,
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400',
  },
  {
    id: 4,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    nickname: '迷途书童',
    time: '昨天',
    content: '发现自己总是习惯性地否定自己。今天尝试用CBT的方法记录负面想法，原来很多想法都是不合理的。',
    mood: '🤔',
    moodText: '思考中',
    likes: 189,
    comments: 31,
    isLiked: false,
    image: null,
  },
  {
    id: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    nickname: '星空下的梦',
    time: '昨天',
    content: '一个人在外地工作，周末总是不知道该做什么。但今天去了一个艺术展，发现生活中还有很多美好的事情在等着我。',
    mood: '🙂',
    moodText: '平静',
    likes: 342,
    comments: 52,
    isLiked: true,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400',
  },
  {
    id: 6,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    nickname: '候鸟',
    time: '2天前',
    content: '刚结束一段感情，心里空落落的。但是看到一句话很治愈："有些人来到你的生命里，是为了教会你一些东西。"希望未来会更好。',
    mood: '💔',
    moodText: '难过',
    likes: 678,
    comments: 89,
    isLiked: false,
    image: null,
  },
];

export default function CommunityScreen() {
  const [posts, setPosts] = useState(POSTS);
  const [showPostInput, setShowPostInput] = useState(false);
  const [newPost, setNewPost] = useState('');
  const [selectedMood, setSelectedMood] = useState('');

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
        };
      }
      return post;
    }));
  };

  const handlePost = () => {
    if (!newPost.trim()) return;
    
    const newPostItem = {
      id: Date.now(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      nickname: '我',
      time: '刚刚',
      content: newPost,
      mood: selectedMood || '😐',
      moodText: selectedMood ? ['😰焦虑', '😢低落', '😐平静', '😊愉悦'][['😰', '😢', '😐', '😊'].indexOf(selectedMood)] : '平静',
      likes: 0,
      comments: 0,
      isLiked: false,
      image: null,
    };
    
    setPosts([newPostItem, ...posts]);
    setNewPost('');
    setSelectedMood('');
    setShowPostInput(false);
  };

  return (
    <Screen>
      <View style={styles.container}>
        {/* 头部 */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>疗愈圈</Text>
            <Text style={styles.subtitle}>匿名树洞，与同频的人相遇</Text>
          </View>
          <TouchableOpacity 
            style={styles.searchBtn}
            activeOpacity={0.7}
          >
            <Ionicons name="search" size={22} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* 发帖按钮 */}
        <TouchableOpacity 
          style={styles.postButton}
          onPress={() => setShowPostInput(true)}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#7B6EF6', '#5CE0D8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.postButtonGradient}
          >
            <Ionicons name="create-outline" size={20} color="#FFF" />
            <Text style={styles.postButtonText}>说出你的心声</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* 发帖输入区 */}
        {showPostInput && (
          <View style={styles.inputSection}>
            <View style={styles.inputCard}>
              <View style={styles.inputHeader}>
                <Text style={styles.inputTitle}>分享此刻的心情</Text>
                <TouchableOpacity onPress={() => setShowPostInput(false)}>
                  <Ionicons name="close" size={24} color={COLORS.textSecondary} />
                </TouchableOpacity>
              </View>
              
              {/* 情绪选择 */}
              <View style={styles.moodSelector}>
                {['😰', '😢', '😐', '😊', '😤'].map((emoji) => (
                  <TouchableOpacity
                    key={emoji}
                    style={[
                      styles.moodOption,
                      selectedMood === emoji && styles.moodOptionActive,
                    ]}
                    onPress={() => setSelectedMood(emoji)}
                  >
                    <Text style={styles.moodEmoji}>{emoji}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              <TextInput
                style={styles.postInput}
                placeholder="在这里写下你的心声..."
                placeholderTextColor={COLORS.textSecondary}
                value={newPost}
                onChangeText={setNewPost}
                multiline
              />
              
              <View style={styles.inputFooter}>
                <TouchableOpacity 
                  style={styles.postSubmitBtn}
                  onPress={handlePost}
                  disabled={!newPost.trim()}
                >
                  <LinearGradient
                    colors={newPost.trim() ? ['#7B6EF6', '#5CE0D8'] : ['#4A4860', '#3A3850']}
                    style={styles.postSubmitGradient}
                  >
                    <Text style={styles.postSubmitText}>发布</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* 帖子列表 */}
        <ScrollView 
          style={styles.postList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.postListContent}
        >
          {posts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <Image
                  source={{ uri: post.avatar }}
                  style={styles.avatar}
                />
                <View style={styles.postHeaderInfo}>
                  <Text style={styles.nickname}>{post.nickname}</Text>
                  <Text style={styles.postTime}>{post.time}</Text>
                </View>
                <View style={styles.postMood}>
                  <Text style={styles.postMoodEmoji}>{post.mood}</Text>
                  <Text style={styles.postMoodText}>{post.moodText}</Text>
                </View>
              </View>
              
              <Text style={styles.postContent}>{post.content}</Text>
              
              {post.image && (
                <Image
                  source={{ uri: post.image }}
                  style={styles.postImage}
                />
              )}
              
              <View style={styles.postFooter}>
                <TouchableOpacity 
                  style={styles.actionBtn}
                  onPress={() => handleLike(post.id)}
                >
                  <Ionicons 
                    name={post.isLiked ? "heart" : "heart-outline"} 
                    size={22} 
                    color={post.isLiked ? COLORS.accent : COLORS.textSecondary} 
                  />
                  <Text style={[
                    styles.actionText,
                    post.isLiked && { color: COLORS.accent }
                  ]}>
                    {post.likes}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionBtn}>
                  <Ionicons name="chatbubble-outline" size={20} color={COLORS.textSecondary} />
                  <Text style={styles.actionText}>{post.comments}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionBtn}>
                  <Ionicons name="share-outline" size={20} color={COLORS.textSecondary} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
          
          {/* 底部安全区 */}
          <View style={styles.bottomSafe} />
        </ScrollView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '300',
    color: COLORS.textPrimary,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  searchBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  postButton: {
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  postButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  postButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },
  inputSection: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  inputCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  inputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  inputTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  moodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  moodOption: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  moodOptionActive: {
    borderColor: COLORS.primary,
    backgroundColor: `${COLORS.primary}15`,
  },
  moodEmoji: {
    fontSize: 24,
  },
  postInput: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: COLORS.textPrimary,
    minHeight: 80,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  inputFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  postSubmitBtn: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  postSubmitGradient: {
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  postSubmitText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  postList: {
    flex: 1,
  },
  postListContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  postCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  postHeaderInfo: {
    flex: 1,
    marginLeft: 12,
  },
  nickname: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  postTime: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  postMood: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${COLORS.primary}15`,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  postMoodEmoji: {
    fontSize: 16,
  },
  postMoodText: {
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: '500',
  },
  postContent: {
    fontSize: 14,
    color: COLORS.textPrimary,
    lineHeight: 22,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 12,
  },
  postFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  bottomSafe: {
    height: 120,
  },
});
