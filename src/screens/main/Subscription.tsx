import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Tabs from '../../components/ui/Tabs'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Icon from 'react-native-vector-icons/Ionicons'

const plans = {
  free: {
    name: 'Free Plan',
    price: 'Free',
    period: 'Forever',
    features: [
      'Lorem Ipsum is simply text of the printing.',
      'Contrary to popular belief, Lorem Ipsum is not.',
      'The standard chunk of Lorem used.',
      'It is a long established fact that a reader will be.',
      'There are many variations of passages.',
    ],
    excluded: [
      'Lorem Ipsum is simply text of the printing.',
      'Contrary to popular belief, Lorem Ipsum is not.',
    ],
    badge: "You're using -",
    badgeColor: 'purple',
  },
  pro: {
    name: 'Pro Plan',
    price: '$9.99',
    period: '/Month',
    features: [
      'Lorem Ipsum is simply text of the printing.',
      'Contrary to popular belief, Lorem Ipsum is not.',
      'The standard chunk of Lorem used.',
      'It is a long established fact that a reader will be.',
      'There are many variations of passages.',
      'Lorem Ipsum is simply text of the printing.',
    ],
    excluded: ['Contrary to popular belief, Lorem Ipsum is not.'],
    badge: 'Most Popular',
    badgeColor: 'green',
  },
  plus: {
    name: 'Plus Plan',
    price: '$19.99',
    period: '/Month',
    features: [
      'Lorem Ipsum is simply text of the printing.',
      'Contrary to popular belief, Lorem Ipsum is not.',
      'The standard chunk of Lorem used.',
      'It is a long established fact that a reader will be.',
      'There are many variations of passages.',
    ],
    excluded: [],
    badge: 'Best for You',
    badgeColor: 'green',
  },
}

export default function Subscription() {
  const navigation = useNavigation<any>()
  const insets = useSafeAreaInsets()
  const [activePlan, setActivePlan] = useState<'free' | 'pro' | 'plus'>('free')
  const [billing, setBilling] = useState<'monthly' | 'annually'>('monthly')

  const plan = plans[activePlan]

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#4B5563" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Subscription</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Plan Tabs */}
          <Tabs
            tabs={[
              { id: 'free', label: 'Free Plan' },
              { id: 'pro', label: 'Pro Plan' },
              { id: 'plus', label: 'Plus Plan' },
            ]}
            activeTab={activePlan}
            onTabChange={(id) => setActivePlan(id as typeof activePlan)}
          />

          {/* Billing Toggle */}
          <View style={styles.billingToggle}>
            <Text style={[styles.billingText, billing === 'monthly' && styles.billingTextActive]}>
              Monthly
            </Text>
            <Switch
              value={billing === 'annually'}
              onValueChange={(value) => setBilling(value ? 'annually' : 'monthly')}
              trackColor={{ false: '#D1D5DB', true: '#0072FF' }}
              thumbColor="#FFFFFF"
            />
            <Text style={[styles.billingText, billing === 'annually' && styles.billingTextActive]}>
              Annually
            </Text>
          </View>

          {/* Plan Card */}
          <View style={styles.planCard}>
            <View style={styles.planHeader}>
              <Text style={styles.planName}>{plan.name}</Text>
              {plan.badge && (
                <Badge
                  label={plan.badge}
                  variant={plan.badgeColor === 'purple' ? 'info' : 'success'}
                />
              )}
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{plan.price}</Text>
              <Text style={styles.period}>{plan.period}</Text>
            </View>

            {/* Features */}
            <View style={styles.featuresContainer}>
              <Text style={styles.featuresTitle}>Features:</Text>
              {plan.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Icon name="checkmark-circle" size={20} color="#10B981" />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
              {plan.excluded.length > 0 && (
                <>
                  <Text style={styles.excludedTitle}>Excluded:</Text>
                  {plan.excluded.map((excluded, index) => (
                    <View key={index} style={styles.featureItem}>
                      <Icon name="close-circle" size={20} color="#EF4444" />
                      <Text style={[styles.featureText, styles.excludedText]}>{excluded}</Text>
                    </View>
                  ))}
                </>
              )}
            </View>

            {/* Subscribe Button */}
            {activePlan !== 'free' && (
              <Button
                variant="primary"
                fullWidth
                onPress={() => {
                  // Handle subscription
                  // navigation.navigate('Payment')
                }}
                style={styles.subscribeButton}
              >
                Subscribe Now
              </Button>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 80,
  },
  billingToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginVertical: 24,
  },
  billingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  billingTextActive: {
    color: '#111827',
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  planName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 24,
  },
  price: {
    fontSize: 36,
    fontWeight: '700',
    color: '#0072FF',
  },
  period: {
    fontSize: 16,
    color: '#6B7280',
  },
  featuresContainer: {
    marginBottom: 24,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  excludedTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginTop: 16,
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  featureText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  excludedText: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  subscribeButton: {
    marginTop: 8,
  },
})
