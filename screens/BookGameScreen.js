import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

export default function BookGameScreen() {
  const [basketLane, setBasketLane] = useState(1);
  const [bookLane, setBookLane] = useState(1);
  const [bookTop, setBookTop] = useState(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [message, setMessage] = useState("Druk op start om te beginnen.");

  const level = Math.floor(score / 5) + 1;
  const speed = Math.max(180, 450 - score * 15);

  useEffect(() => {
    if (!isPlaying || isPaused) {
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
    }, speed);

    return () => clearInterval(timer);
  }, [isPlaying, isPaused, basketLane, bookLane, speed]);

  function startGame() {
    setBasketLane(1);
    setBookLane(1);
    setBookTop(0);
    setScore(0);
    setMisses(0);
    setIsPaused(false);
    setIsPlaying(true);
    setMessage("Vang de boeken!");
  }

  function pauseGame() {
    if (isPlaying) {
      setIsPaused(!isPaused);
    }
  }

  function checkCatch() {
    if (bookLane === basketLane) {
      setMessage("Goed gevangen!");
      setScore((currentScore) => {
        const newScore = currentScore + 1;

        if (newScore > highScore) {
          setHighScore(newScore);
        }

        return newScore;
      });
    } else {
      setMessage("Gemist!");
      setMisses((currentMisses) => {
        const newMisses = currentMisses + 1;

        if (newMisses >= 3) {
          setIsPlaying(false);
          setMessage("Game over!");
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
        <Text style={styles.scoreText}>Level: {level}</Text>
        <Text style={styles.scoreText}>Gemist: {misses}/3</Text>
      </View>
      <Text style={styles.highScore}>Beste score: {highScore}</Text>
      <Text style={styles.message}>{message}</Text>
      {isPaused ? (
        <Text style={styles.pauseText}>Pauze</Text>
      ) : null}

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
        <Pressable style={styles.controlButton} onPress={pauseGame}>
          <Text style={styles.buttonText}>{isPaused ? "Hervat" : "Pauze"}</Text>
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
    marginBottom: 8
  },
  scoreText: {
    color: colors.ink,
    fontWeight: "900"
  },
  highScore: {
    color: colors.primaryDark,
    fontWeight: "900",
    marginBottom: 8
  },
  message: {
    color: colors.ink,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 12
  },
  pauseText: {
    color: colors.primaryDark,
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 12
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
    flexWrap: "wrap",
    justifyContent: "center"
  },
  controlButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 7,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginHorizontal: 4,
    marginBottom: 8
  },
  startButton: {
    backgroundColor: colors.primary,
    borderRadius: 7,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginHorizontal: 4,
    marginBottom: 8
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
