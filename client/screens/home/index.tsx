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
import { useSafeRouter } from '@/hooks/useSafeRouter';

const { width } = Dimensions.get('window');

// 极光柔和风格配色
const COLORS = {
  primary: '#7B6EF6',
  secondary: '#5CE0D8',
  accent: '#F2A7E0',
  background: '#0D1026',
  card: 'rgba(255,255,255,0.06)',
  cardBorder: 'rgba(255,255,255,0.08)',
  textPrimary: '#EEEAF6',
  textSecondary: '#8E8BA3',
  gradientStart: 'rgba(123,110,246,0.4)',
  gradientMid: 'rgba(92,224,216,0.25)',
};

// 情绪类型
const MOODS = [
  { id: 'anxious', emoji: '😰', label: '焦虑', color: '#FF9A9E' },
  { id: 'sad', emoji: '😢', label: '低落', color: '#A8C0FF' },
  { id: 'peaceful', emoji: '😌', label: '平静', color: '#5CE0D8' },
  { id: 'happy', emoji: '😊', label: '愉悦', color: '#FFD700' },
  { id: 'angry', emoji: '😠', label: '愤怒', color: '#FF6B6B' },
];

// 快捷入口
const QUICK_ENTRIES = [
  { id: 'meditation', icon: 'leaf', title: '正念冥想', desc: '呼吸放松', gradient: ['#7B6EF6', '#5CE0D8'] },
  { id: 'diary', icon: 'create', title: '情绪日记', desc: '记录心情', gradient: ['#F2A7E0', '#FF9A9E'] },
  { id: 'breathing', icon: 'water', title: '呼吸练习', desc: '平缓情绪', gradient: ['#5CE0D8', '#4ECDC4'] },
  { id: 'music', icon: 'musical-notes', title: '疗愈音乐', desc: '舒缓解压', gradient: ['#667EEA', '#764BA2'] },
];

// 今日推荐
const RECOMMENDATIONS = [
  { id: 1, title: '接纳焦虑：与不确定性共处', duration: '10分钟', category: 'CBT练习', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400' },
  { id: 2, title: '深度放松：身体扫描冥想', duration: '15分钟', category: '正念冥想', image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400' },
  { id: 3, title: '认知重构：识别负面思维', duration: '12分钟', category: '认知疗法', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400' },
];

export default function HomeScreen() {
  const router = useSafeRouter();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodNote, setMoodNote] = useState('');

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
  };

  const handleEntryPress = (entryId: string) => {
    if (entryId === 'meditation' || entryId === 'breathing') {
      router.push('/island');
    } else if (entryId === 'diary') {
      router.push('/workshop');
    }
  };

  return (
    <Screen>
      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* 顶部渐变装饰 */}
        <View style={styles.gradientContainer}>
          <LinearGradient
            colors={[COLORS.gradientStart, 'transparent']}
            style={styles.gradient}
          />
          {/* 光点装饰 */}
          <View style={[styles.lightSpot, { top: 20, left: 30, width: 80, height: 80 }]} />
          <View style={[styles.lightSpot, { top: 60, right: 50, width: 120, height: 120 }]} />
        </View>

        {/* 头部区域 */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>晚上好</Text>
            <Text style={styles.subtitle}>今天你的心情如何？</Text>
          </View>
          <TouchableOpacity style={styles.notificationBtn}>
            <Ionicons name="notifications-outline" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* 情绪气象站卡片 */}
        <View style={styles.moodCard}>
          <LinearGradient
            colors={['rgba(123,110,246,0.15)', 'rgba(92,224,216,0.08)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.moodCardGradient}
          >
            <View style={styles.moodHeader}>
              <Ionicons name="cloudy" size={24} color={COLORS.secondary} />
              <Text style={styles.moodTitle}>情绪气象站</Text>
              <View style={styles.weatherBadge}>
                <Text style={styles.weatherText}>多云转晴</Text>
              </View>
            </View>
            
            {/* 情绪选择 */}
            <Text style={styles.moodQuestion}>此刻你的情绪是？</Text>
            <View style={styles.moodGrid}>
              {MOODS.map((mood) => (
                <TouchableOpacity
                  key={mood.id}
                  style={[
                    styles.moodItem,
                    selectedMood === mood.id && { 
                      backgroundColor: `${mood.color}20`,
                      borderColor: mood.color,
                    },
                  ]}
                  onPress={() => handleMoodSelect(mood.id)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                  <Text style={[
                    styles.moodLabel,
                    selectedMood === mood.id && { color: mood.color },
                  ]}>
                    {mood.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* 心情备注 */}
            <View style={styles.noteContainer}>
              <TextInput
                style={styles.noteInput}
                placeholder="写下此刻的感受..."
                placeholderTextColor={COLORS.textSecondary}
                value={moodNote}
                onChangeText={setMoodNote}
                multiline
              />
            </View>

            <TouchableOpacity style={styles.analyzeBtn} activeOpacity={0.8}>
              <LinearGradient
                colors={['#7B6EF6', '#5CE0D8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.analyzeBtnGradient}
              >
                <Ionicons name="analytics" size={18} color="#FFF" />
                <Text style={styles.analyzeBtnText}>开始分析</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* 快捷入口 */}
        <Text style={styles.sectionTitle}>快捷入口</Text>
        <View style={styles.entriesGrid}>
          {QUICK_ENTRIES.map((entry) => (
            <TouchableOpacity
              key={entry.id}
              style={styles.entryCard}
              onPress={() => handleEntryPress(entry.id)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={entry.gradient as [string, string]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.entryIconBg}
              >
                <Ionicons name={entry.icon as any} size={24} color="#FFF" />
              </LinearGradient>
              <Text style={styles.entryTitle}>{entry.title}</Text>
              <Text style={styles.entryDesc}>{entry.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 今日推荐 */}
        <Text style={styles.sectionTitle}>今日推荐</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.recommendContainer}
        >
          {RECOMMENDATIONS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.recommendCard}
              activeOpacity={0.9}
              onPress={() => router.push('/workshop')}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.recommendImage}
              />
              <View style={styles.recommendOverlay}>
                <View style={styles.recommendBadge}>
                  <Text style={styles.recommendBadgeText}>{item.category}</Text>
                </View>
                <Text style={styles.recommendTitle}>{item.title}</Text>
                <View style={styles.recommendMeta}>
                  <Ionicons name="time-outline" size={14} color={COLORS.textSecondary} />
                  <Text style={styles.recommendDuration}>{item.duration}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 底部安全区 */}
        <View style={styles.bottomSafe} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    paddingBottom: 120,
  },
  gradientContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 280,
    overflow: 'hidden',
  },
  gradient: {
    position: 'absolute',
    width: '150%',
    height: '100%',
    left: '-25%',
    top: 0,
  },
  lightSpot: {
    position: 'absolute',
    borderRadius: 9999,
    backgroundColor: 'rgba(123,110,246,0.12)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  greeting: {
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
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  moodCard: {
    marginHorizontal: 20,
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  moodCardGradient: {
    padding: 24,
  },
  moodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  moodTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginLeft: 10,
    flex: 1,
  },
  weatherBadge: {
    backgroundColor: 'rgba(92,224,216,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  weatherText: {
    fontSize: 12,
    color: COLORS.secondary,
    fontWeight: '500',
  },
  moodQuestion: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  moodGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  moodItem: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'transparent',
    minWidth: (width - 88) / 5,
  },
  moodEmoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  noteContainer: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  noteInput: {
    fontSize: 14,
    color: COLORS.textPrimary,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  analyzeBtn: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  analyzeBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  analyzeBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginHorizontal: 20,
    marginTop: 32,
    marginBottom: 16,
  },
  entriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  entryCard: {
    width: (width - 56) / 2,
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  entryIconBg: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  entryTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  entryDesc: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  recommendContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  recommendCard: {
    width: 200,
    height: 240,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  recommendImage: {
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  recommendOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(13,16,38,0.8)',
  },
  recommendBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  recommendBadgeText: {
    fontSize: 10,
    color: '#FFF',
    fontWeight: '600',
  },
  recommendTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  recommendMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  recommendDuration: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  bottomSafe: {
    height: 40,
  },
});
