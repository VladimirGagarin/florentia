// app/index.js
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Linking,
} from "react-native";
import { useRouter } from "expo-router";
import { topics } from "./components/data/topicData";
import { darkTheme } from "./components/legos/theme";

const { width, height } = Dimensions.get("window");
const numColumns = 2;
const cardWidth = (width - darkTheme.spacing.medium * 2 - darkTheme.spacing.medium) / numColumns;

export default function HomeScreen() {
  const router = useRouter();

  

  const getTopicIcon = (topicName) => {
    const iconMap = {
      'Romantic Lines': '💕',
      'Philosophy Questions': '📚',
      'Counselling Questions': '🧠',
      'Debatable Questions': '⚖️',
      'Dao Wisdom': '☯️',
      'Timeless Quotes': '📜',
    };
    return iconMap[topicName] || '📖';
  };

  const getTopicColor = (topicName) => {
    const colorMap = {
      'Romantic Lines': '#E94560',
      'Philosophy Questions': '#B68B6D',
      'Counselling Questions': '#81B69D',
      'Debatable Questions': '#e7d464',
      'Dao Wisdom': '#365516',
      'Timeless Quotes': '#A7C0CD',
    };
    return colorMap[topicName] || '#B68B6D';
  };

  const renderTopic = ({ item }) => (

    
    <TouchableOpacity
      style={[
        styles.topicCard,
        {
          backgroundColor: darkTheme.colors.surface,
          borderLeftColor: getTopicColor(item.topicName),
        }
      ]}
   

    onPress={() => {
  
        router.push(`/topic/${item.slug}`);
    }}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: darkTheme.colors.background }]}>
        <Text style={styles.topicIcon}>{getTopicIcon(item.topicName)}</Text>
      </View>

      <Text style={[styles.topicName, { color: darkTheme.colors.text }]}>
        {item.topicName}
      </Text>

      <Text style={[styles.topicDescription, { color: darkTheme.colors.secondaryText }]} numberOfLines={2}>
        {item.description}
      </Text>

      <View style={[styles.readMoreContainer, { borderTopColor: darkTheme.colors.border }]}>
        <Text style={[styles.readMoreText, { color: darkTheme.colors.accent }]}>
          Explore →
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: darkTheme.colors.background }]}>
      <View style={[styles.contentCard, { backgroundColor: darkTheme.colors.surface }]}>
        <Text style={[styles.header, { color: darkTheme.colors.text }]}>
          Welcome to Florentia
        </Text>
        <Text style={[styles.tagLine, { color: darkTheme.colors.secondaryText }]}>
         Where 
        </Text>
      </View>

      <FlatList
        data={topics}
        keyExtractor={(item) => item.slug}
        renderItem={renderTopic}
        numColumns={numColumns}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={[styles.sectionTitle, { color: darkTheme.colors.text }]}>
            Explore Topics
          </Text>
        }
        ListFooterComponent={
          <View style={styles.footerContainer}>
            <View style={[styles.footerQuoteCard, { backgroundColor: darkTheme.colors.surface }]}>
              <Text style={[styles.quoteIcon, { color: darkTheme.colors.accent }]}>✨</Text>
              <Text style={[styles.footerQuote, { color: darkTheme.colors.secondaryText }]}>
                "The journey of a thousand miles begins with a single step."
              </Text>
              <Text style={[styles.quoteAuthor, { color: darkTheme.colors.border }]}>
                — Lao Tzu
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.inspirationCard, { backgroundColor: darkTheme.colors.surface }]}
              onPress={() => Linking.openURL('https://vladimirgagarin.github.io/personale/')}
              activeOpacity={0.8}
            >
              <Text style={[styles.inspirationIcon, { color: darkTheme.colors.accent }]}>🔗</Text>
              <Text style={[styles.inspirationTitle, { color: darkTheme.colors.text }]}>
                More Inspiration
              </Text>
              <Text style={[styles.inspirationText, { color: darkTheme.colors.secondaryText }]}>
                Visit our online platform for additional topics and wisdom
              </Text>
              <Text style={[styles.inspirationLink, { color: darkTheme.colors.accent }]}>
                Explore Now →
              </Text>
            </TouchableOpacity>
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
    padding: darkTheme.spacing.medium,
  },
  contentCard: {
    padding: darkTheme.spacing.large,
    borderRadius: darkTheme.borderRadius.large,
    alignItems: "center",
    borderWidth: 1,
    borderColor: darkTheme.colors.border,
    marginBottom: darkTheme.spacing.medium,
    maxHeight: height * 0.25,
  },
  header: {
    fontSize: darkTheme.typography.header.fontSize,
    fontWeight: darkTheme.typography.header.fontWeight,
    lineHeight: darkTheme.typography.header.lineHeight,
    marginBottom: darkTheme.spacing.small,
    textAlign: "center",
  },
  tagLine: {
    fontSize: darkTheme.typography.body.fontSize,
    lineHeight: darkTheme.typography.body.lineHeight,
    textAlign: "center",
    fontStyle: "italic",
  },
  sectionTitle: {
    fontSize: darkTheme.typography.subheader.fontSize,
    fontWeight: "600",
    marginBottom: darkTheme.spacing.medium,
    marginLeft: darkTheme.spacing.small,
  },
  topicCard: {
    width: cardWidth,
    margin: darkTheme.spacing.small / 2,
    padding: darkTheme.spacing.medium,
    borderRadius: darkTheme.borderRadius.medium,
    borderWidth: 1,
    borderColor: darkTheme.colors.border,
    borderLeftWidth: 4,
    alignItems: "center",
    backgroundColor: darkTheme.colors.surface,
    minHeight: 180,
    aspectRatio: 0.9,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: darkTheme.spacing.small,
  },
  topicIcon: {
    fontSize: 28,
  },
  topicName: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 4,
  },
  topicDescription: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: darkTheme.spacing.small,
    lineHeight: 16,
  },
  readMoreContainer: {
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: darkTheme.colors.border,
    paddingTop: darkTheme.spacing.small,
    marginTop: "auto",
    alignItems: "center",
  },
  readMoreText: {
    fontSize: 12,
    fontWeight: "500",
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: darkTheme.spacing.small / 2,
  },
  listContent: {
    paddingBottom: darkTheme.spacing.large,
    marginTop: darkTheme.spacing.small,
  },
  footerContainer: {
    marginTop: darkTheme.spacing.large,
    marginBottom: darkTheme.spacing.medium,
  },
  footerQuoteCard: {
    padding: darkTheme.spacing.large,
    borderRadius: darkTheme.borderRadius.medium,
    borderWidth: 1,
    borderColor: darkTheme.colors.border,
    alignItems: 'center',
  },
  quoteIcon: {
    fontSize: 24,
    marginBottom: darkTheme.spacing.small,
  },
  footerQuote: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: darkTheme.spacing.small,
  },
  quoteAuthor: {
    fontSize: 12,
    textAlign: 'center',
  },
  inspirationCard: {
    marginTop: darkTheme.spacing.medium,
    padding: darkTheme.spacing.large,
    borderRadius: darkTheme.borderRadius.medium,
    borderWidth: 1,
    borderColor: darkTheme.colors.border,
    alignItems: 'center',
  },
  inspirationIcon: {
    fontSize: 32,
    marginBottom: darkTheme.spacing.small,
  },
  inspirationTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: darkTheme.spacing.small,
  },
  inspirationText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: darkTheme.spacing.medium,
    lineHeight: 20,
  },
  inspirationLink: {
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});