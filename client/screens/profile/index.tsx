/* eslint-disable */
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '@/components/Screen';

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

// 用户统计数据
const STATS = [
  { label: '连续打卡', value: '7', unit: '天', icon: 'flame', color: '#FF9A9E' },
  { label: '情绪记录', value: '23', unit: '次', icon: 'heart', color: COLORS.accent },
  { label: '冥想时长', value: '120', unit: '分钟', icon: 'leaf', color: COLORS.secondary },
  { label: '疗愈积分', value: '580', unit: '', icon: 'star', color: '#FFD700' },
];

// 情绪趋势数据
const MOOD_TREND = [
  { day: '一', score: 72 },
  { day: '二', score: 68 },
  { day: '三', score: 75 },
  { day: '四', score: 80 },
  { day: '五', score: 65 },
  { day: '六', score: 85 },
  { day: '日', score: 88 },
];

// 设置菜单项
const SETTINGS = [
  { id: 'subscription', icon: 'diamond', title: '心屿Pro', subtitle: '解锁全部功能', color: COLORS.accent, badge: '¥19.9/月' },
  { id: 'reminder', icon: 'notifications', title: '每日提醒', subtitle: '定时推送疗愈提醒', color: COLORS.secondary },
  { id: 'privacy', icon: 'shield-checkmark', title: '隐私设置', subtitle: '管理你的数据', color: COLORS.primary },
  { id: 'help', icon: 'help-circle', title: '帮助与反馈', subtitle: '联系我们', color: '#5CE0D8' },
  { id: 'about', icon: 'information-circle', title: '关于心屿', subtitle: '版本 1.0.0', color: COLORS.textSecondary },
];

// 成就徽章
const ACHIEVEMENTS = [
  { id: 1, icon: '🌅', title: '初次觉醒', desc: '完成第一次情绪记录', unlocked: true },
  { id: 2, icon: '🔥', title: '坚持不懈', desc: '连续打卡7天', unlocked: true },
  { id: 3, icon: '🌙', title: '夜猫子', desc: '深夜使用冥想功能', unlocked: true },
  { id: 4, icon: '🌈', title: '情绪稳定', desc: '连续7天情绪分数>80', unlocked: false },
  { id: 5, icon: '🏔️', title: '心灵探索', desc: '体验所有岛屿场景', unlocked: false },
  { id: 6, icon: '💎', title: '内心平静', desc: '完成10次正念冥想', unlocked: false },
];

export default function ProfileScreen() {
  const [selectedTab, setSelectedTab] = useState('stats');

  const maxScore = Math.max(...MOOD_TREND.map(m => m.score));

  return (
    <Screen>
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* 头部渐变 */}
        <View style={styles.headerGradient}>
          <LinearGradient
            colors={['rgba(123,110,246,0.3)', 'rgba(92,224,216,0.15)', 'transparent']}
            style={styles.headerGradientBg}
          />
        </View>

        {/* 用户信息 */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200' }}
              style={styles.avatar}
            />
            <View style={styles.vipBadge}>
              <Ionicons name="diamond" size={12} color="#FFD700" />
            </View>
          </View>
          <Text style={styles.username}>心灵旅者</Text>
          <Text style={styles.userDesc}>在疗愈中遇见更好的自己</Text>
          
          {/* Pro按钮 */}
          <TouchableOpacity style={styles.proButton} activeOpacity={0.8}>
            <LinearGradient
              colors={['#F2A7E0', '#FF9A9E']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.proButtonGradient}
            >
              <Ionicons name="diamond" size={16} color="#FFF" />
              <Text style={styles.proButtonText}>升级心屿Pro</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* 统计数据卡片 */}
        <View style={styles.statsCard}>
          <View style={styles.statsGrid}>
            {STATS.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <View style={[styles.statIconBg, { backgroundColor: `${stat.color}20` }]}>
                  <Ionicons name={stat.icon as any} size={20} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Tab选择 */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, selectedTab === 'stats' && styles.tabActive]}
            onPress={() => setSelectedTab('stats')}
          >
            <Text style={[styles.tabText, selectedTab === 'stats' && styles.tabTextActive]}>
              情绪趋势
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, selectedTab === 'achievements' && styles.tabActive]}
            onPress={() => setSelectedTab('achievements')}
          >
            <Text style={[styles.tabText, selectedTab === 'achievements' && styles.tabTextActive]}>
              我的成就
            </Text>
          </TouchableOpacity>
        </View>

        {/* 情绪趋势 */}
        {selectedTab === 'stats' && (
          <View style={styles.trendCard}>
            <View style={styles.trendHeader}>
              <Text style={styles.trendTitle}>本周情绪趋势</Text>
              <Text style={styles.trendAvg}>平均 76分</Text>
            </View>
            <View style={styles.chartContainer}>
              {MOOD_TREND.map((item, index) => (
                <View key={index} style={styles.chartItem}>
                  <View style={styles.barContainer}>
                    <View 
                      style={[
                        styles.bar, 
                        { 
                          height: `${(item.score / maxScore) * 100}%`,
                          backgroundColor: item.score >= 75 ? COLORS.secondary : item.score >= 65 ? COLORS.primary : COLORS.accent,
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.chartLabel}>{item.day}</Text>
                </View>
              ))}
            </View>
            <View style={styles.trendFooter}>
              <View style={styles.trendLegend}>
                <View style={[styles.legendDot, { backgroundColor: COLORS.secondary }]} />
                <Text style={styles.legendText}>良好</Text>
              </View>
              <View style={styles.trendLegend}>
                <View style={[styles.legendDot, { backgroundColor: COLORS.primary }]} />
                <Text style={styles.legendText}>一般</Text>
              </View>
              <View style={styles.trendLegend}>
                <View style={[styles.legendDot, { backgroundColor: COLORS.accent }]} />
                <Text style={styles.legendText}>需关注</Text>
              </View>
            </View>
          </View>
        )}

        {/* 成就徽章 */}
        {selectedTab === 'achievements' && (
          <View style={styles.achievementGrid}>
            {ACHIEVEMENTS.map((item) => (
              <View 
                key={item.id} 
                style={[
                  styles.achievementCard,
                  !item.unlocked && styles.achievementLocked,
                ]}
              >
                <Text style={[
                  styles.achievementIcon,
                  !item.unlocked && styles.achievementIconLocked,
                ]}>
                  {item.icon}
                </Text>
                <Text style={[
                  styles.achievementTitle,
                  !item.unlocked && styles.achievementTextLocked,
                ]}>
                  {item.title}
                </Text>
                <Text style={[
                  styles.achievementDesc,
                  !item.unlocked && styles.achievementTextLocked,
                ]}>
                  {item.desc}
                </Text>
                {item.unlocked && (
                  <View style={styles.unlockedBadge}>
                    <Ionicons name="checkmark-circle" size={16} color={COLORS.secondary} />
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* 设置列表 */}
        <Text style={styles.sectionTitle}>更多设置</Text>
        <View style={styles.settingsList}>
          {SETTINGS.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.settingItem}
              activeOpacity={0.7}
            >
              <View style={[styles.settingIcon, { backgroundColor: `${item.color}20` }]}>
                <Ionicons name={item.icon as any} size={20} color={item.color} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>{item.title}</Text>
                <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
              </View>
              {item.badge ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
              ) : (
                <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
              )}
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
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 280,
    overflow: 'hidden',
  },
  headerGradientBg: {
    position: 'absolute',
    width: '150%',
    height: '100%',
    left: '-25%',
    top: 0,
  },
  profileSection: {
    alignItems: 'center',
    paddingTop: 70,
    paddingBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  vipBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  username: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  userDesc: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  proButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  proButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 8,
  },
  proButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  statsCard: {
    marginHorizontal: 20,
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  statIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 16,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
  },
  tabActive: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#FFF',
  },
  trendCard: {
    marginHorizontal: 20,
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  trendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  trendTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  trendAvg: {
    fontSize: 13,
    color: COLORS.secondary,
    fontWeight: '500',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    paddingBottom: 24,
  },
  chartItem: {
    flex: 1,
    alignItems: 'center',
  },
  barContainer: {
    width: 24,
    height: 80,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  bar: {
    width: '100%',
    borderRadius: 12,
    minHeight: 8,
  },
  chartLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 8,
  },
  trendFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
    paddingTop: 16,
  },
  trendLegend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  achievementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  achievementCard: {
    width: '47%',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    position: 'relative',
  },
  achievementLocked: {
    opacity: 0.5,
  },
  achievementIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  achievementIconLocked: {
    // grayscale: 1,
  },
  achievementTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  achievementDesc: {
    fontSize: 11,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  achievementTextLocked: {
    color: COLORS.textSecondary,
  },
  unlockedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  settingsList: {
    marginHorizontal: 20,
    backgroundColor: COLORS.card,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingContent: {
    flex: 1,
    marginLeft: 12,
  },
  settingTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  settingSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  badge: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 11,
    color: '#FFF',
    fontWeight: '600',
  },
  bottomSafe: {
    height: 40,
  },
});
