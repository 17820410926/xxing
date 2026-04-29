/* eslint-disable */
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/Screen';
import { useSafeRouter } from '@/hooks/useSafeRouter';

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

// CBT练习分类
const CATEGORIES = [
  { id: 'all', name: '全部', icon: 'apps' },
  { id: 'diary', name: '情绪日记', icon: 'book' },
  { id: 'cognitive', name: '认知重构', icon: 'bulb' },
  { id: 'mindfulness', name: '正念冥想', icon: 'leaf' },
  { id: 'breathing', name: '呼吸练习', icon: 'water' },
];

// CBT练习列表
const EXERCISES = [
  {
    id: 1,
    title: '情绪日记：觉察与记录',
    category: '情绪日记',
    duration: '10分钟',
    level: '入门',
    progress: 0,
    description: '学习如何记录和识别自己的情绪模式',
    icon: 'book',
    color: '#F2A7E0',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=400',
    steps: [
      { title: '情境描述', desc: '写下让你产生情绪的事件' },
      { title: '情绪识别', desc: '识别你体验到的具体情绪' },
      { title: '强度评估', desc: '评估情绪的强烈程度(1-10)' },
      { title: '想法记录', desc: '记录事件触发的自动思维' },
    ],
  },
  {
    id: 2,
    title: '认知扭曲识别',
    category: '认知重构',
    duration: '15分钟',
    level: '进阶',
    progress: 30,
    description: '识别常见的10种认知扭曲模式',
    icon: 'bulb',
    color: '#FFD700',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    steps: [
      { title: '全或无思维', desc: '非黑即白的极端思考' },
      { title: '过度概括', desc: '以单一事件得出普遍结论' },
      { title: '心理过滤', desc: '只关注负面而忽略正面' },
      { title: '否定正面', desc: '贬低自己的成就和优点' },
    ],
  },
  {
    id: 3,
    title: '三栏式思维记录',
    category: '认知重构',
    duration: '20分钟',
    level: '进阶',
    progress: 0,
    description: '用结构化方法分析负面思维',
    icon: 'create',
    color: '#667EEA',
    image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=400',
    steps: [
      { title: '自动思维', desc: '记录出现的负面想法' },
      { title: '认知扭曲', desc: '识别其中的思维谬误' },
      { title: '理性回应', desc: '构建更平衡的替代思维' },
    ],
  },
  {
    id: 4,
    title: '身体扫描冥想',
    category: '正念冥想',
    duration: '15分钟',
    level: '入门',
    progress: 60,
    description: '通过扫描身体感受来达到放松',
    icon: 'person',
    color: '#5CE0D8',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
    steps: [
      { title: '准备', desc: '找一个舒适的姿势' },
      { title: '呼吸连接', desc: '通过呼吸放松身体' },
      { title: '身体扫描', desc: '从头到脚感受身体' },
      { title: '整合', desc: '整体感受身体的放松' },
    ],
  },
  {
    id: 5,
    title: '4-7-8呼吸法',
    category: '呼吸练习',
    duration: '5分钟',
    level: '入门',
    progress: 0,
    description: '一种快速平复焦虑的呼吸技巧',
    icon: 'water',
    color: '#5CE0D8',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    steps: [
      { title: '吸气', desc: '通过鼻子数4下' },
      { title: '屏息', desc: '屏住呼吸数7下' },
      { title: '呼气', desc: '通过嘴巴数8下' },
    ],
  },
  {
    id: 6,
    title: '接纳承诺疗法入门',
    category: '正念冥想',
    duration: '12分钟',
    level: '进阶',
    progress: 0,
    description: '学会接纳痛苦情绪并采取有效行动',
    icon: 'leaf',
    color: '#A8C0FF',
    image: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=400',
    steps: [
      { title: '觉察', desc: '观察当下的想法和感受' },
      { title: '接纳', desc: '允许情绪存在而不抗拒' },
      { title: '价值澄清', desc: '明确对你真正重要的东西' },
      { title: '承诺行动', desc: '采取符合价值的行动' },
    ],
  },
];

export default function WorkshopScreen() {
  const router = useSafeRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showDiary, setShowDiary] = useState(false);
  const [diaryContent, setDiaryContent] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<typeof EXERCISES[0] | null>(null);

  const filteredExercises = selectedCategory === 'all' 
    ? EXERCISES 
    : EXERCISES.filter(e => e.category === CATEGORIES.find(c => c.id === selectedCategory)?.name);

  const handleExercisePress = (exercise: typeof EXERCISES[0]) => {
    if (exercise.category === '情绪日记') {
      setShowDiary(true);
    } else {
      setSelectedExercise(exercise);
    }
  };

  if (showDiary) {
    return (
      <Screen>
        <View style={styles.diaryContainer}>
          <View style={styles.diaryHeader}>
            <TouchableOpacity onPress={() => setShowDiary(false)} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>
            <Text style={styles.diaryTitle}>情绪日记</Text>
            <TouchableOpacity style={styles.saveBtn}>
              <Text style={styles.saveBtnText}>保存</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.diaryContent} showsVerticalScrollIndicator={false}>
            <Text style={styles.diaryDate}>
              {new Date().toLocaleDateString('zh-CN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                weekday: 'long'
              })}
            </Text>
            
            {/* 情绪选择 */}
            <Text style={styles.diarySectionTitle}>今天的心情</Text>
            <View style={styles.emotionRow}>
              {['😢', '😔', '😐', '🙂', '😊'].map((emoji, index) => (
                <TouchableOpacity key={index} style={styles.emotionBtn}>
                  <Text style={styles.emotionEmoji}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {/* 引导问题 */}
            <Text style={styles.diarySectionTitle}>发生了什么？</Text>
            <TextInput
              style={styles.diaryInput}
              placeholder="描述今天让你有情绪波动的事件..."
              placeholderTextColor={COLORS.textSecondary}
              multiline
            />
            
            <Text style={styles.diarySectionTitle}>你的想法是什么？</Text>
            <TextInput
              style={styles.diaryInput}
              placeholder="当时脑海中浮现的念头是..."
              placeholderTextColor={COLORS.textSecondary}
              multiline
            />
            
            <Text style={styles.diarySectionTitle}>你现在感觉如何？</Text>
            <TextInput
              style={styles.diaryInput}
              placeholder="记录下此刻的情绪和身体感受..."
              placeholderTextColor={COLORS.textSecondary}
              value={diaryContent}
              onChangeText={setDiaryContent}
              multiline
            />
            
            {/* 感恩练习 */}
            <Text style={styles.diarySectionTitle}>今日感恩</Text>
            <TextInput
              style={styles.diaryInput}
              placeholder="今天让你心怀感激的一件事是..."
              placeholderTextColor={COLORS.textSecondary}
              multiline
            />
            
            <View style={styles.diaryBottom} />
          </ScrollView>
        </View>
      </Screen>
    );
  }

  if (selectedExercise) {
    return (
      <Screen>
        <View style={styles.detailContainer}>
          <Image
            source={{ uri: selectedExercise.image }}
            style={styles.detailImage}
          />
          <LinearGradient
            colors={['transparent', COLORS.background]}
            style={styles.detailGradient}
          />
          
          <View style={styles.detailHeader}>
            <TouchableOpacity 
              onPress={() => setSelectedExercise(null)} 
              style={styles.backBtn}
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            style={styles.detailScroll}
            contentContainerStyle={styles.detailScrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.detailCard}>
              <View style={[styles.detailIconBg, { backgroundColor: `${selectedExercise.color}20` }]}>
                <Ionicons name={selectedExercise.icon as any} size={32} color={selectedExercise.color} />
              </View>
              <Text style={styles.detailTitle}>{selectedExercise.title}</Text>
              <View style={styles.detailMeta}>
                <View style={styles.metaTag}>
                  <Ionicons name="time-outline" size={14} color={COLORS.textSecondary} />
                  <Text style={styles.metaText}>{selectedExercise.duration}</Text>
                </View>
                <View style={styles.metaTag}>
                  <Ionicons name="speedometer-outline" size={14} color={COLORS.textSecondary} />
                  <Text style={styles.metaText}>{selectedExercise.level}</Text>
                </View>
              </View>
              <Text style={styles.detailDesc}>{selectedExercise.description}</Text>
              
              {/* 步骤列表 */}
              <Text style={styles.stepTitle}>练习步骤</Text>
              {selectedExercise.steps.map((step, index) => (
                <View key={index} style={styles.stepItem}>
                  <View style={[styles.stepNumber, { backgroundColor: `${selectedExercise.color}20` }]}>
                    <Text style={[styles.stepNumberText, { color: selectedExercise.color }]}>
                      {index + 1}
                    </Text>
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={styles.stepItemTitle}>{step.title}</Text>
                    <Text style={styles.stepItemDesc}>{step.desc}</Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
          
          <View style={styles.detailFooter}>
            <TouchableOpacity style={styles.startBtn} activeOpacity={0.8}>
              <LinearGradient
                colors={['#7B6EF6', '#5CE0D8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.startBtnGradient}
              >
                <Text style={styles.startBtnText}>开始练习</Text>
                <Ionicons name="arrow-forward" size={18} color="#FFF" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* 头部 */}
        <View style={styles.header}>
          <Text style={styles.title}>CBT工坊</Text>
          <Text style={styles.subtitle}>认知行为疗法练习，帮助你重构思维</Text>
        </View>

        {/* 分类选择 */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryItem,
                selectedCategory === cat.id && styles.categoryItemActive,
              ]}
              onPress={() => setSelectedCategory(cat.id)}
            >
              <Ionicons 
                name={cat.icon as any} 
                size={18} 
                color={selectedCategory === cat.id ? COLORS.primary : COLORS.textSecondary} 
              />
              <Text style={[
                styles.categoryText,
                selectedCategory === cat.id && styles.categoryTextActive,
              ]}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 练习列表 */}
        <View style={styles.exerciseList}>
          {filteredExercises.map((exercise) => (
            <TouchableOpacity
              key={exercise.id}
              style={styles.exerciseCard}
              onPress={() => handleExercisePress(exercise)}
              activeOpacity={0.9}
            >
              <Image
                source={{ uri: exercise.image }}
                style={styles.exerciseImage}
              />
              <LinearGradient
                colors={['transparent', 'rgba(13,16,38,0.95)']}
                style={styles.exerciseOverlay}
              />
              <View style={styles.exerciseContent}>
                <View style={styles.exerciseHeader}>
                  <View style={[styles.exerciseBadge, { backgroundColor: `${exercise.color}20` }]}>
                    <Text style={[styles.exerciseBadgeText, { color: exercise.color }]}>
                      {exercise.category}
                    </Text>
                  </View>
                  {exercise.progress > 0 && (
                    <View style={styles.progressBadge}>
                      <Text style={styles.progressText}>{exercise.progress}%</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.exerciseTitle}>{exercise.title}</Text>
                <View style={styles.exerciseMeta}>
                  <Ionicons name="time-outline" size={14} color={COLORS.textSecondary} />
                  <Text style={styles.exerciseMetaText}>{exercise.duration}</Text>
                  <View style={styles.metaDot} />
                  <Ionicons name="speedometer-outline" size={14} color={COLORS.textSecondary} />
                  <Text style={styles.exerciseMetaText}>{exercise.level}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

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
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
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
    marginTop: 8,
  },
  categoryContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 10,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    gap: 6,
    marginRight: 10,
  },
  categoryItemActive: {
    backgroundColor: `${COLORS.primary}15`,
    borderColor: COLORS.primary,
  },
  categoryText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: COLORS.primary,
  },
  exerciseList: {
    paddingHorizontal: 16,
    gap: 16,
  },
  exerciseCard: {
    height: 180,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  exerciseImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  exerciseOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
  },
  exerciseContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  exerciseBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  exerciseBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  progressBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  progressText: {
    fontSize: 10,
    color: '#FFF',
    fontWeight: '600',
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  exerciseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  exerciseMetaText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: COLORS.textSecondary,
    marginHorizontal: 4,
  },
  bottomSafe: {
    height: 40,
  },
  // Diary styles
  diaryContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  diaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  diaryTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  saveBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
  },
  saveBtnText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
  },
  diaryContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  diaryDate: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 24,
  },
  diarySectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 12,
    marginTop: 20,
  },
  emotionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  emotionBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  emotionEmoji: {
    fontSize: 28,
  },
  diaryInput: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    fontSize: 14,
    color: COLORS.textPrimary,
    minHeight: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  diaryBottom: {
    height: 40,
  },
  // Detail styles
  detailContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  detailImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 250,
    opacity: 0.4,
    transform: [{ scale: 1.2 }],
  },
  detailGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 250,
  },
  detailHeader: {
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  detailScroll: {
    flex: 1,
    marginTop: 100,
  },
  detailScrollContent: {
    paddingBottom: 100,
  },
  detailCard: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingTop: 32,
  },
  detailIconBg: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  detailMeta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  metaTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  detailDesc: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: 24,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: '600',
  },
  stepContent: {
    flex: 1,
  },
  stepItemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  stepItemDesc: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  detailFooter: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 16,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
  },
  startBtn: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  startBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  startBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
