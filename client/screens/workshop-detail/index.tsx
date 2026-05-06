import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Screen } from '@/components/Screen';
import { useSafeRouter } from '@/hooks/useSafeRouter';

const COLORS = {
  primary: '#7B6EF6',
  secondary: '#5CE0D8',
  accent: '#F2A7E0',
  background: '#0D1026',
  textPrimary: '#EEEAF6',
  textSecondary: '#8E8BA3',
  cardBg: 'rgba(123, 110, 246, 0.1)',
  border: 'rgba(123, 110, 246, 0.2)',
};

const WORKSHOPS = [
  { id: '1', title: '情绪日记入门', desc: '学习如何记录和理解自己的情绪', icon: 'book', duration: '15分钟', progress: 80 },
  { id: '2', title: '认知重构练习', desc: '识别和改变负面思维模式', icon: 'bulb', duration: '20分钟', progress: 45 },
  { id: '3', title: '正念冥想基础', desc: '初学者友好的冥想引导', icon: 'leaf', duration: '10分钟', progress: 100 },
  { id: '4', title: '呼吸放松练习', desc: '科学呼吸法缓解焦虑', icon: 'water', duration: '8分钟', progress: 60 },
];

export default function WorkshopDetailScreen() {
  const router = useSafeRouter();

  return (
    <Screen>
      <View style={styles.container}>
        {/* 返回按钮 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backBtnText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>CBT工坊详情</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* 简介卡片 */}
          <View style={styles.introCard}>
            <View style={styles.introIcon}>
              <Text style={styles.introIconText}>CBT</Text>
            </View>
            <Text style={styles.introTitle}>认知行为疗法工作坊</Text>
            <Text style={styles.introDesc}>
              CBT是一种被科学证实有效的心理治疗方法，通过改变负面思维模式来改善情绪和行为。本工作坊将带你系统学习CBT的核心技巧。
            </Text>
          </View>

          {/* 课程列表 */}
          <Text style={styles.sectionTitle}>我的课程</Text>
          {WORKSHOPS.map((workshop) => (
            <View key={workshop.id} style={styles.workshopCard}>
              <View style={styles.workshopHeader}>
                <View style={styles.workshopInfo}>
                  <Text style={styles.workshopTitle}>{workshop.title}</Text>
                  <Text style={styles.workshopDuration}>{workshop.duration}</Text>
                </View>
                <View style={[styles.progressBadge, workshop.progress === 100 && styles.completedBadge]}>
                  <Text style={styles.progressText}>
                    {workshop.progress === 100 ? '已完成' : `${workshop.progress}%`}
                  </Text>
                </View>
              </View>
              <Text style={styles.workshopDesc}>{workshop.desc}</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${workshop.progress}%` }]} />
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.cardBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backBtnText: {
    fontSize: 20,
    color: COLORS.textPrimary,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  introCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  introIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  introIconText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  introTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 12,
    textAlign: 'center',
  },
  introDesc: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 22,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  workshopCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  workshopHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  workshopInfo: {
    flex: 1,
  },
  workshopTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  workshopDuration: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  progressBadge: {
    backgroundColor: COLORS.primary + '30',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  completedBadge: {
    backgroundColor: COLORS.secondary + '30',
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.primary,
  },
  workshopDesc: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  bottomSafe: {
    height: 40,
  },
});
