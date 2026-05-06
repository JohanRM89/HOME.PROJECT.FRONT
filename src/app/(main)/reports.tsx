import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ORANGE = "#FF6B35";
const GREEN = "#2E7D32";
const BACKGROUND = "#F4F5F7";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
    padding: 16,
  },

  screenTitle: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },

  mainCard: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    marginTop: 8,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
  },

  label: {
    color: "#666",
    fontSize: 14,
  },

  percentage: {
    fontSize: 42,
    fontWeight: "700",
    color: ORANGE,
    marginVertical: 4,
  },

  positiveIndicator: {
    color: GREEN,
    fontWeight: "600",
    marginBottom: 16,
  },

  /* ─── Barra vertical ─── */
  verticalBarContainer: {
    alignItems: "center",
  },

  verticalBarTrack: {
    width: 24,
    height: 120,
    backgroundColor: "#EEE",
    borderRadius: 12,
    justifyContent: "flex-end",
    overflow: "hidden",
  },

  verticalBarFill: {
    height: "50%",
    backgroundColor: ORANGE,
  },

  barLabel: {
    marginTop: 8,
    fontSize: 14,
  },

  /* ─── Progreso individual ─── */
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: ORANGE,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 20,
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
  },

  subtitle: {
    fontSize: 13,
    color: "#666",
    marginBottom: 8,
  },

  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  horizontalBarTrack: {
    flex: 1,
    height: 8,
    backgroundColor: "#EEE",
    borderRadius: 4,
    overflow: "hidden",
  },

  horizontalBarFill: {
    width: "50%",
    backgroundColor: ORANGE,
    height: "100%",
  },

  progressText: {
    fontWeight: "600",
  },

  /* ─── Resumen ─── */
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
  },

  summaryItem: {
    alignItems: "center",
  },

  summaryIcon: {
    fontSize: 24,
  },

  summaryNumber: {
    fontSize: 22,
    fontWeight: "700",
  },

  summaryLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});

export default function ReportsScreen() {
  return (
    <View style={styles.container}>
      {/* TÍTULO */}
      <Text style={styles.screenTitle}>Reportes</Text>

      {/* CONTENEDOR PRINCIPAL */}
      <View style={styles.mainCard}>
        {/* ───────────────────────────── */}
        {/* SECCIÓN 1: RENDIMIENTO SEMANAL */}
        {/* ───────────────────────────── */}
        <Text style={styles.sectionTitle}>Rendimiento semanal</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Tareas completadas totales</Text>

          <Text style={styles.percentage}>50%</Text>

          <Text style={styles.positiveIndicator}>↑ 1 de 2</Text>

          {/* BARRA VERTICAL */}
          <View style={styles.verticalBarContainer}>
            <View style={styles.verticalBarTrack}>
              <View style={styles.verticalBarFill} />
            </View>
            <Text style={styles.barLabel}>Johan</Text>
          </View>
        </View>

        {/* ───────────────────────────── */}
        {/* SECCIÓN 2: PROGRESO INDIVIDUAL */}
        {/* ───────────────────────────── */}
        <Text style={styles.sectionTitle}>Progreso individual</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            {/* AVATAR */}
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>J</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>Johan</Text>
              <Text style={styles.subtitle}>
                1 de 2 completadas 🏆 10000 pts
              </Text>

              {/* BARRA HORIZONTAL */}
              <View style={styles.progressRow}>
                <View style={styles.horizontalBarTrack}>
                  <View style={styles.horizontalBarFill} />
                </View>
                <Text style={styles.progressText}>50%</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ───────────────────────────── */}
        {/* SECCIÓN 3: RESUMEN */}
        {/* ───────────────────────────── */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryIcon}>✅</Text>
            <Text style={styles.summaryNumber}>1</Text>
            <Text style={styles.summaryLabel}>Total completadas</Text>
          </View>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryIcon}>⏰</Text>
            <Text style={styles.summaryNumber}>1</Text>
            <Text style={styles.summaryLabel}>Pendientes</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
``