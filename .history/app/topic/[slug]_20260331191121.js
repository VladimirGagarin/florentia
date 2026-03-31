// app/topic/[screen].js
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { topics } from "../components/data/topicData";
import { darkTheme } from "../components/legos/theme";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const numColumns = 2;
const cardWidth =
  (width - darkTheme.spacing.medium * 2 - darkTheme.spacing.medium) /
  numColumns;

export default function TopicScreen() {
  const { slug } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const topic = topics.find((t) => t.slug === slug);

  const getSubtopicIcon = (subtopic) => {
    const iconMap = {
      // Existing subtopics
      Love: "❤️",
      Longing: "🥀",
      Devotion: "🙏",
      "First Love": "💘",
      "Eternal Love": "💕∞",

      // New subtopics
      "Soul Connection": "✨", // Sparkling stars - represents spiritual connection
      Heartfelt: "💝", // Heart with ribbon - deep emotional gift
      Poetic: "📖", // Book - artistic/written expression
      Playful: "😄", // Smiling face - fun and light-hearted
      "Nature's Beauty": "🌺", // Hibiscus - natural beauty

      // Keep your existing ones
      Life: "🌟",
      Art: "🎨",
      Religion: "🕯️",
      Truth: "⚖️",
      Reality: "🌀",
      "Self-Growth": "🌱",
      Healing: "🩹",
      Relationships: "💞",
      Purpose: "🎯",
      Emotions: "🌊",
      Ethics: "📜",
      Society: "👥",
      Morality: "⚖️",
      Justice: "🏛️",
      Simplicity: "🍃",
      Patience: "⏳",
      Flow: "🌊",
      Balance: "⚖️",
      Nature: "🌿",
      Harmony: "🎵",
      Wisdom: "🦉",
      Courage: "🦁",
      Happiness: "😊",
      Peace: "☮️",
      Inspiration: "✨",
      "Life Lessons": "📚",
      "French Love": "🥐",
      intellectual_romance: "🥖",
      divine_love: "💕",
      witty_deep: "⏳",
      Shakesperean_Love: "🎭",
      Victorian_Romance: "👒",
      Pirates_Romance: "🏴‍☠️",
      Love_Letters: "✉️",
      Midnight_Romance: "🌙",
      Art_and_Music: "🎵",
      Roses_Of_Rome: "🌹",
      Worldy_Romance: "🌍",
      Unrequited_Love: "💔",
      Indulgent_Love: "🍷",
      time_and_death: "⏳",
      Consciousness: "🧠",
      freedom_and_politics: "🗳️",
      Existence: "🌌",
      knowledge_and_logic: "📚",
      numbers_and_mathematics: "🔢",
      language: "🗣️",
      Trust: "🤝",
      Vulnerability: "V", // icon for vulnerability
      Boundaries: "🚧",
      Forgiveness: "🕊️",
      Identity: "🔍",
      Fear: "😨",
      Resilience: "🌱",
      Authenticity: "✨",
      Loneliness: "🌙",
      Shame: "😞",
      Trust: "🤝",
      Boundaries: "🚧",
      Forgiveness: "🕊️",
      Fear: "😨",
      Resilience: "🌱",
      Authenticity: "✨",
      Loneliness: "🌙",
      Shame: "😞",
      self_love: "💖",
      Trust: "🤝",
      self_awareness_and_self_worth: "🌱",
      Emotions: "💭",
      Questions: "❓",
      "Love_& Relationships": "💕",
      "Science_& Origins": "🔬",
      "Religion_& Faith": "⛪",
      "Ethics_& Morality": "⚖️",
      "Society_& Culture": "👥",
      "Technology_& Humanity": "🤖",
      "Life_& Death": "⚰️",
      "Gender_& Identity": "🪞",
      "Politics_& Power": "🏛️",
      "Truth_& Lies": "🔍",
      "Free Will_& Fate": "🎲",
      "Nature vs. Nurture": "🧬",
      "Art_& Censorship": "🎨",
      "Happiness_& Success": "😊",
      "The_Futureof Humanity": "🚀",
    };
    return iconMap[subtopic] || "❓";
  };

  const getSubtopicColor = (index) => {
    const colors = [
      "#E94560",
      "#81B69D",
      "#B68B6D",
      "#A7C0CD",
      "#e7d464",
      "#365516",
      "#ff6f91",
      "#845ec2",
      "#d65db1",
      "#ff9671",
      "#0081cf",
      "#ffc75f",
      "#f9f871",
      "#c34a36",
      "#f67280",
      "#6c5b7b",
      "#355c7d",
      "#99b898",
      "#fecea8",
      "#ff847c",
      "#e84a5f",
      "#2a363b",
      "#a8e6cf",
      "#dcedc1",
      "#ffd3b6",
      "#ffaaa5",
      "#ff8c94",
      "#f6cd61",
      "#fe8a71",
      "#fce38a",
    ];
    return colors[index % colors.length];
  };

  const renderSubtopic = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.subtopicCard,
        {
          backgroundColor: darkTheme.colors.surface,
          borderLeftColor: getSubtopicColor(index),
          width: cardWidth,
        },
      ]}
      onPress={() => router.push(`/topic/${slug}/${item}`)}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: darkTheme.colors.background },
        ]}
      >
        <Text style={[styles.subtopicIcon, { color: darkTheme.colors.text }]}>
          {getSubtopicIcon(item)}
        </Text>
      </View>
      <Text
        style={[styles.subtopicName, { color: darkTheme.colors.text }]}
        numberOfLines={2}
      >
        {/*replace punctuations and capitalise every word */}
        {item
          .replace(/_/g, " ")
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </Text>
      <View
        style={[
          styles.exploreContainer,
          { borderTopColor: darkTheme.colors.border },
        ]}
      >
        <Text style={[styles.exploreText, { color: darkTheme.colors.accent }]}>
          Explore →
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (!topic) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: darkTheme.colors.background },
        ]}
      >
        <Text style={{ color: darkTheme.colors.text }}>
          Topic "{slug}" not found
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: darkTheme.colors.background,
          paddingTop: insets.top,
        },
      ]}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={darkTheme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: darkTheme.colors.text }]}>
          {topic.topicName}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <View
        style={[
          styles.descriptionCard,
          { backgroundColor: darkTheme.colors.surface },
        ]}
      >
        <Text
          style={[
            styles.description,
            { color: darkTheme.colors.secondaryText },
          ]}
        >
          {topic.description}
        </Text>
      </View>

      <FlatList
        data={topic.subtopics || []}
        keyExtractor={(item, index) => `${topic.slug}-${item}-${index}`}
        renderItem={renderSubtopic}
        numColumns={numColumns}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={[styles.sectionTitle, { color: darkTheme.colors.text }]}>
            Explore by Theme
          </Text>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: darkTheme.spacing.medium,
  },
  backButton: {
    padding: darkTheme.spacing.small,
  },
  headerTitle: {
    fontSize: darkTheme.typography.subheader.fontSize,
    fontWeight: "bold",
  },
  descriptionCard: {
    padding: darkTheme.spacing.medium,
    borderRadius: darkTheme.borderRadius.medium,
    borderWidth: 1,
    borderColor: darkTheme.colors.border,
    marginBottom: darkTheme.spacing.medium,
  },
  description: {
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
  subtopicCard: {
    margin: darkTheme.spacing.small / 2,
    padding: darkTheme.spacing.medium,
    borderRadius: darkTheme.borderRadius.medium,
    borderWidth: 1,
    borderColor: darkTheme.colors.border,
    borderLeftWidth: 4,
    alignItems: "center",
    minHeight: 140,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: darkTheme.spacing.small,
  },
  subtopicIcon: {
    fontSize: 24,
  },
  subtopicName: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: darkTheme.spacing.small,
  },
  exploreContainer: {
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: darkTheme.colors.border,
    paddingTop: darkTheme.spacing.small,
    marginTop: "auto",
    alignItems: "center",
  },
  exploreText: {
    fontSize: 11,
    fontWeight: "500",
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: darkTheme.spacing.small / 2,
  },
  listContent: {
    paddingBottom: darkTheme.spacing.large,
  },
});
