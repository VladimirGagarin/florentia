// app/topic/[slug]/[subtopic].js
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Share,
  Linking
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { topics } from "./../../components/data/topicData";  // ✅ This should work
import { darkTheme } from "./../../components/legos/theme";   // ✅ This should work
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// For content files - from app/topic/[slug]/[subtopic].js
// Go up 3 levels to reach app/data/content/
const contentData = {
  romance: require('./../../data/content/romance.json'),
  philosophy: require('./../../data/content/philosophy.json'),
  choices: require('./../../data/content/choices.json'),
  relationship: require('./../../data/content/relationship.json'),
  dao: require('./../../data/content/dao.json'),
  quotes: require('./../../data/content/quotes.json'),
};

export default function SubtopicDetailScreen() {
  const { slug, subtopic } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Decode and normalize the subtopic name
  const decodedSubtopic = decodeURIComponent(subtopic).toLowerCase();
  
  // Get content for this topic and subtopic
  const topicContent = contentData[slug] || {};
  const items = topicContent[decodedSubtopic] || [];
  
  // Find the topic to get display name
  const topic = topics.find(t => t.slug === slug);

  const handleShare = async (item) => {
    try {
      await Share.share({
        message: item,
        title: `Shared from Florentia - ${decodedSubtopic}\ for more visit: https://vladimirgagarin.github.io/personale/`,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={[styles.card, { backgroundColor: darkTheme.colors.surface }]}>
      <Text style={[styles.number, { color: darkTheme.colors.accent }]}>
        {index + 1}
      </Text>
      <Text style={[styles.text, { color: darkTheme.colors.text }]}>
        {item}
      </Text>
      
      <TouchableOpacity 
        style={styles.shareButton}
        onPress={() => handleShare(item)}
      >
        <Ionicons name="share-outline" size={20} color={darkTheme.colors.accent} />
      </TouchableOpacity>
    </View>
  );

  // Format subtopic name for display
  const formatName = (name) => {
    return name.replace(/_/g, ' ').split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <View style={[styles.container, { backgroundColor: darkTheme.colors.background, paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={darkTheme.colors.text} />
        </TouchableOpacity>
        <View>
          <Text style={[styles.subtopicTitle, { color: darkTheme.colors.accent }]}>
            {formatName(decodedSubtopic)}
          </Text>
          <Text style={[styles.topicTitle, { color: darkTheme.colors.secondaryText }]}>
            {topic?.topicName || slug}
          </Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      {/* Content List */}
      <FlatList
        data={items}
        keyExtractor={(item, index) => `${slug}-${decodedSubtopic}-${index}`}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="leaf-outline" size={60} color={darkTheme.colors.border} />
            <Text style={[styles.emptyText, { color: darkTheme.colors.secondaryText }]}>
              No content yet
            </Text>
            <Linking onPress={() => router.push('/contribute')} style={{ marginTop: darkTheme.spacing.medium, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: darkTheme.colors.accent }}> Look for  more  Online:</Text><Text style={{ color: darkTheme.colors.accent }}> https://vladimirgagarin.github.io/personale/</Text>
            </Linking>
          </View>
        }
      />

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: darkTheme.spacing.medium,
    paddingVertical: darkTheme.spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: darkTheme.colors.border,
  },
  backButton: {
    padding: darkTheme.spacing.small,
  },
  subtopicTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  topicTitle: {
    fontSize: 12,
    marginTop: 2,
  },
  listContent: {
    padding: darkTheme.spacing.medium,
  },
  card: {
    padding: darkTheme.spacing.large,
    borderRadius: darkTheme.borderRadius.medium,
    borderWidth: 1,
    borderColor: darkTheme.colors.border,
    marginBottom: darkTheme.spacing.medium,
  },
  number: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: darkTheme.spacing.small,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: darkTheme.spacing.medium,
  },
  shareButton: {
    alignSelf: 'flex-end',
    padding: darkTheme.spacing.small,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: darkTheme.spacing.xlarge,
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    marginTop: darkTheme.spacing.medium,
  },
});