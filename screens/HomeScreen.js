import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import CampusCard from "../components/CampusCard";
import FilterChip from "../components/FilterChip";
import NewsCard from "../components/NewsCard";
import ProductCard from "../components/ProductCard";
import { campuses as fallbackCampuses, fallbackNews, fallbackProducts } from "../data/fallbackData";
import { colors } from "../theme/colors";

const API_TOKEN = process.env.EXPO_PUBLIC_WEBFLOW_TOKEN;

const PRODUCTS_ID = "6a1c8401d891929be39c3c96";
const SKUS_ID = "6a1c8401d891929be39c3c97";
const PRODUCT_CATEGORIES_ID = "6a1c8401d891929be39c3c92";
const NEWS_ID = "6a19a3d882028f795783d2e4";
const NEWS_CATEGORIES_ID = "6a19a530bfe7e9dd8e3e0fde";
const CAMPUSES_ID = "6a1a19c850966f1b318c4b4e";
const CAMPUS_FOCUS_ID = "6a1a1d7c6d4d91ecdb98f6e4";

const headers = {
  Authorization: `Bearer ${API_TOKEN}`,
  "Content-Type": "application/json"
};

function removeHtml(text) {
  if (!text) return "";

  return text
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("nl-BE");
}

function getCategoryName(id, categories, fallback) {
  const category = categories.find((item) => item.id === id);
  const name = category?.fieldData?.name;

  if (!name || name.toLowerCase() === "alles") {
    return fallback;
  }

  return name;
}

function getFirstGoodCategory(ids, categories, fallback) {
  if (!Array.isArray(ids)) {
    return getCategoryName(ids, categories, fallback);
  }

  for (let i = 0; i < ids.length; i++) {
    const name = getCategoryName(ids[i], categories, "");
    if (name) {
      return name;
    }
  }

  return fallback;
}

function getCategories(items) {
  const categories = ["Alle"];

  items.forEach((item) => {
    if (item.category && !categories.includes(item.category)) {
      categories.push(item.category);
    }
  });

  return categories;
}

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [articles, setArticles] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [productSearch, setProductSearch] = useState("");
  const [newsSearch, setNewsSearch] = useState("");
  const [productCategory, setProductCategory] = useState("Alle");
  const [newsCategory, setNewsCategory] = useState("Alle");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      await fetchCampuses();
      await fetchNews();
      await fetchProducts();
      setIsLoading(false);
    }

    fetchData();
  }, []);

async function fetchProducts() {
    try {
      if (!API_TOKEN) {
        setProducts(fallbackProducts);
        return;
      }

      const productsResponse = await fetch(
        `https://api.webflow.com/v2/collections/${PRODUCTS_ID}/items`,
        { headers }
      );
      const skusResponse = await fetch(
        `https://api.webflow.com/v2/collections/${SKUS_ID}/items`,
        { headers }
      );
      const categoriesResponse = await fetch(
        `https://api.webflow.com/v2/collections/${PRODUCT_CATEGORIES_ID}/items`,
        { headers }
      );

      const productsData = await productsResponse.json();
      const skusData = await skusResponse.json();
      const categoriesData = await categoriesResponse.json();

      const productsFromApi = productsData.items.map((item) => {
        const fields = item.fieldData;
        const sku = skusData.items.find((skuItem) => skuItem.id === fields["default-sku"]);
        const price = sku?.fieldData?.price?.value || 0;

        return {
          id: item.id,
          name: fields.name,
          description: fields.description,
          category: getFirstGoodCategory(fields.category, categoriesData.items, "Webshop"),
          image: sku?.fieldData?.["main-image"]?.url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900",
          price: price / 100
        };
      });

      setProducts(productsFromApi);
    } catch (error) {
      console.error("Error fetching products", error);
      setProducts(fallbackProducts);
    }
  }

async function fetchNews() {
    try {
      if (!API_TOKEN) {
        setArticles(fallbackNews);
        return;
      }

      const newsResponse = await fetch(
        `https://api.webflow.com/v2/collections/${NEWS_ID}/items`,
        { headers }
      );
      const categoriesResponse = await fetch(
        `https://api.webflow.com/v2/collections/${NEWS_CATEGORIES_ID}/items`,
        { headers }
      );

      const newsData = await newsResponse.json();
      const categoriesData = await categoriesResponse.json();

      const newsFromApi = newsData.items.map((item) => {
        const fields = item.fieldData;
        const body = removeHtml(fields.inhoud);

        return {
          id: item.id,
          title: fields.name,
          category: getCategoryName(fields["categorie-2"], categoriesData.items, "Nieuws"),
          date: formatDate(fields.datum),
          image: fields.afbeelding?.url || "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=900",
          intro: body.slice(0, 140),
          body
        };
      });

      setArticles(newsFromApi);
    } catch (error) {
      console.error("Error fetching news", error);
      setArticles(fallbackNews);
    }
  }

async function fetchCampuses() {
    try {
      if (!API_TOKEN) {
        setCampuses(fallbackCampuses);
        return;
      }

      const campusesResponse = await fetch(
        `https://api.webflow.com/v2/collections/${CAMPUSES_ID}/items`,
        { headers }
      );
      const focusResponse = await fetch(
        `https://api.webflow.com/v2/collections/${CAMPUS_FOCUS_ID}/items`,
        { headers }
      );

      const campusesData = await campusesResponse.json();
      const focusData = await focusResponse.json();

      const campusesFromApi = campusesData.items.map((item) => {
        const fields = item.fieldData;
        const focusIds = fields["focus-categorie-2"] || [];
        const focusNames = focusIds
          .map((id) => getCategoryName(id, focusData.items, ""))
          .filter((name) => name);

        return {
          id: item.id,
          name: fields.name,
          city: "Mechelen",
          focus: focusNames.join(", ") || "Busleyden Atheneum",
          image: fields.afbeelding?.url || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900",
          description: fields["korte-intro"],
          body: removeHtml(fields["volledige-beschrijving"]),
          quote: fields.quote,
          address: fields.adres
        };
      });

      setCampuses(campusesFromApi);
    } catch (error) {
      console.error("Error fetching campuses", error);
      setCampuses(fallbackCampuses);
    }
  }

  const productCategories = getCategories(products);
  const newsCategories = getCategories(articles);

  const filteredProducts = products.filter((product) => {
    const selectedCategory = productCategory === "Alle" || product.category === productCategory;
    const searchedProduct = product.name.toLowerCase().includes(productSearch.toLowerCase());
    return selectedCategory && searchedProduct;
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  const filteredNews = articles.filter((article) => {
    const selectedCategory = newsCategory === "Alle" || article.category === newsCategory;
    const searchedArticle = article.title.toLowerCase().includes(newsSearch.toLowerCase());
    return selectedCategory && searchedArticle;
  });

  const sortedNews = filteredNews.sort((a, b) => {
    return a.title.localeCompare(b.title);
  });

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <View style={styles.heroCopy}>
          <Text style={styles.heroTitle}>Jouw talent, jouw toekomst.</Text>
          <Text style={styles.heroText}>Op welke campus bouw jij aan jouw toekomst?</Text>
        </View>
      </View>

      {isLoading ? (
        <Text style={styles.loadingText}>Gegevens laden...</Text>
      ) : null}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Campussen</Text>
        {campuses.map((campus) => (
          <CampusCard
            key={campus.id}
            campus={campus}
            onPress={() => navigation.navigate("CampusDetails", { campus })}
          />
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Nieuws</Text>
          <Text style={styles.readMore}>Lees meer</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Zoek nieuws op naam"
          value={newsSearch}
          onChangeText={setNewsSearch}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
          {newsCategories.map((category) => (
            <FilterChip
              key={category}
              label={category}
              active={newsCategory === category}
              onPress={() => setNewsCategory(category)}
            />
          ))}
        </ScrollView>
        {sortedNews.map((article) => (
          <NewsCard
            key={article.id}
            article={article}
            onPress={() => navigation.navigate("NewsDetails", { article })}
          />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Webshop</Text>
        <TextInput
          style={styles.input}
          placeholder="Zoek product op naam"
          value={productSearch}
          onChangeText={setProductSearch}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
          {productCategories.map((category) => (
            <FilterChip
              key={category}
              label={category}
              active={productCategory === category}
              onPress={() => setProductCategory(category)}
            />
          ))}
        </ScrollView>
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onPress={() => navigation.navigate("ProductDetails", { product })}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background
  },
  container: {
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 44
  },
  hero: {
    marginBottom: 34
  },
  heroCopy: {
    marginBottom: 18
  },
  heroTitle: {
    color: colors.ink,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "900"
  },
  heroText: {
    color: colors.muted,
    marginTop: 10,
    lineHeight: 21
  },
  section: {
    marginBottom: 38
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 27,
    fontWeight: "900",
    marginBottom: 12
  },
  readMore: {
    color: colors.ink,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 7,
    paddingHorizontal: 12,
    paddingVertical: 7,
    fontWeight: "900"
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 7,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    color: colors.ink,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.22,
    shadowRadius: 2,
    elevation: 2
  },
  row: {
    marginBottom: 8
  },
  loadingText: {
    color: colors.primaryDark,
    fontWeight: "900",
    marginBottom: 20
  }
});
