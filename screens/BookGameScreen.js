import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

export default function BookGameScreen() {
  const [basketLane, setBasketLane] = useState(1);
  const [bookLane, setBookLane] = useState(1);
  const [bookTop, setBookTop] = useState(0);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const timer = setInterval(() => {
      setBookTop((currentTop) => {
        if (currentTop >= 260) {
          checkCatch();
          return 0;
        }

        return currentTop + 20;
      });
    }, 450);

    return () => clearInterval(timer);
  }, [isPlaying, basketLane, bookLane]);

  function startGame() {
    setBasketLane(1);
    setBookLane(1);
    setBookTop(0);
    setScore(0);
    setMisses(0);
    setIsPlaying(true);
  }

  function checkCatch() {
    if (bookLane === basketLane) {
      setScore((currentScore) => currentScore + 1);
    } else {
      setMisses((currentMisses) => {
        const newMisses = currentMisses + 1;

        if (newMisses >= 3) {
          setIsPlaying(false);
        }

        return newMisses;
      });
    }

    setBookLane(Math.floor(Math.random() * 3));
  }

  function moveLeft() {
    if (basketLane > 0) {
      setBasketLane(basketLane - 1);
    }
  }

  function moveRight() {
    if (basketLane < 2) {
      setBasketLane(basketLane + 1);
    }
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Boeken vangen</Text>
      <Text style={styles.text}>Vang zoveel mogelijk schoolboeken in je boekentas.</Text>

      <View style={styles.scoreRow}>
        <Text style={styles.scoreText}>Score: {score}</Text>
        <Text style={styles.scoreText}>Gemist: {misses}/3</Text>
      </View>

      <View style={styles.gameBox}>
        <View style={styles.laneRow}>
          {[0, 1, 2].map((lane) => (
            <View key={lane} style={styles.lane}>
              {bookLane === lane ? (
                <View style={[styles.book, { top: bookTop }]}>
                  <Text style={styles.bookText}>BOEK</Text>
                </View>
              ) : null}

              {basketLane === lane ? (
                <View style={styles.basket}>
                  <Text style={styles.basketText}>TAS</Text>
                </View>
              ) : null}
            </View>
          ))}
        </View>
      </View>

      <View style={styles.buttons}>
        <Pressable style={styles.controlButton} onPress={moveLeft}>
          <Text style={styles.buttonText}>Links</Text>
        </Pressable>
        <Pressable style={styles.startButton} onPress={startGame}>
          <Text style={styles.startText}>{isPlaying ? "Opnieuw" : "Start"}</Text>
        </Pressable>
        <Pressable style={styles.controlButton} onPress={moveRight}>
          <Text style={styles.buttonText}>Rechts</Text>
        </Pressable>
      </View>

      {!isPlaying && misses >= 3 ? (
        <Text style={styles.gameOver}>Game over! Je score is {score}.</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 22
  },
  title: {
    color: colors.ink,
    fontSize: 32,
    fontWeight: "900",
    marginBottom: 8
  },
  text: {
    color: colors.muted,
    lineHeight: 21,
    marginBottom: 18
  },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14
  },
  scoreText: {
    color: colors.ink,
    fontWeight: "900"
  },
  gameBox: {
    height: 360,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 9,
    backgroundColor: colors.soft,
    overflow: "hidden",
    marginBottom: 18
  },
  laneRow: {
    flexDirection: "row",
    flex: 1
  },
  lane: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: colors.line,
    alignItems: "center"
  },
  book: {
    position: "absolute",
    width: 58,
    height: 34,
    borderRadius: 6,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center"
  },
  bookText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "900"
  },
  basket: {
    position: "absolute",
    bottom: 16,
    width: 70,
    height: 42,
    borderRadius: 7,
    backgroundColor: colors.ink,
    alignItems: "center",
    justifyContent: "center"
  },
  basketText: {
    color: "#fff",
    fontWeight: "900"
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  controlButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 7,
    paddingHorizontal: 18,
    paddingVertical: 12
  },
  startButton: {
    backgroundColor: colors.primary,
    borderRadius: 7,
    paddingHorizontal: 24,
    paddingVertical: 12
  },
  buttonText: {
    color: colors.ink,
    fontWeight: "900"
  },
  startText: {
    color: "#fff",
    fontWeight: "900"
  },
  gameOver: {
    color: colors.primaryDark,
    fontSize: 18,
    fontWeight: "900",
    marginTop: 18,
    textAlign: "center"
  }
});
