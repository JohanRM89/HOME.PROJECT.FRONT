import { useAuthStore } from "@/modules/auth/ui/auth.store";
import { ScreenContainer } from "@/shared/components/common/ScreenContainer";
import { ChartBar } from "@/shared/components/reports/CharBar";
import { ProgressCard } from "@/shared/components/reports/ProgressCard";
import { SummaryCard } from "@/shared/components/reports/SummaryCard";
import { useReports } from "@/shared/hooks/useReports";
import { ScrollView, View } from "react-native";
import { Text } from "react-native-paper";

export default function ReportsScreen() {

  const memberid = useAuthStore((s) => s.memberid);
  const { error_reports, loading_reports, reports, reload } = useReports(memberid);
  const DataReport = reports?.data;
  const DataReportUsersList = reports?.data.users;

  return (
    <ScreenContainer noPadding>
      <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
        <View
          style={{
            height: 72,
            backgroundColor: "#FFFFFF",
            paddingHorizontal: 20,
            borderBottomWidth: 1,
            borderBottomColor: "#F1F5F9",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
         
          <Text style={{ fontSize: 19, fontWeight: "900", color: "#111827" }}>
            Reportes de Cumplimiento
          </Text>

        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 28,
            paddingBottom: 120,
          }}
        >
          <Text
            style={{
              fontSize: 26,
              fontWeight: "900",
              color: "#111827",
              marginBottom: 24,
            }}
          >
            Rendimiento semanal
          </Text>
          <View
            style={{
              flexDirection: "row",
              gap: 18,
              marginTop: 2,
            }}
          >
            <SummaryCard
              icon="checkmark-done-circle-outline"
              value={DataReport?.summary.completed}
              label="Total completadas"
              color="#FA541C"
              bg="#FFF1E8"
              border="#FED7C3"
            />

            <SummaryCard
              icon="calendar-outline"
              value={DataReport?.summary.pending}
              label="Pendientes"
              color="#64748B"
              bg="#F1F5F9"
              border="#E2E8F0"
            />
          </View>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 14,
              borderWidth: 1,
              borderColor: "#EEF2F7",
              padding: 24,
              height: 330,
              marginBottom: 44,
              marginTop: 18,
            }}
          >
            <Text style={{ fontSize: 15, color: "#64748B", marginBottom: 4 }}>
              Tareas completadas totales
            </Text>

            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <Text
                style={{
                  fontSize: 42,
                  fontWeight: "900",
                  color: "#111827",
                  letterSpacing: -1,
                }}
              >
                {DataReport?.summary.complianceRate}%
              </Text>

              {/* <Text
                style={{
                  marginLeft: 10,
                  marginBottom: 8,
                  color: "#10B981",
                  fontSize: 14,
                  fontWeight: "900",
                }}
              >
                ↗ +12% esta semana
              </Text> */}
            </View>

            <View
              style={{
                flex: 1,
                marginTop: 28,
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "space-between",
              }}
            >
              {DataReportUsersList?.map((m, i) => (
                <ChartBar name={m.name} key={i} value={m.percent} />
              ))}
            </View>
          </View>

          <Text
            style={{
              fontSize: 22,
              fontWeight: "900",
              color: "#111827",
              marginBottom: 18,
            }}
          >
            Progreso individual
          </Text>

          <View style={{ gap: 16 }}>
            {DataReportUsersList?.map((m, i) => (
              <ProgressCard
                key={i}
                name={m.name}
                detail={`${m.completed} de ${m.total} tareas completadas` } 
                percent={m.percent}
              />))}
          </View>
        </ScrollView>
      </View>
    </ScreenContainer>
  );
}




