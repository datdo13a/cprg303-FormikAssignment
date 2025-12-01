import { logout } from "@/utils/logout";
import { Redirect, router } from "expo-router";
import React, {useEffect, useState} from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../hooks/useAuth";
import { auth, db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [fetchingData, setFetchingData] = useState(true);

    useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        try {
          console.log("Fetching data for user:", user.uid); // Debug log
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            console.log("User data found:", docSnap.data()); // Debug log
            setUserData(docSnap.data());
          } else {
            console.log("No user document found in Firestore");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setFetchingData(false);
        }
      } else {
        console.log("No user UID available yet"); // Debug log
        setFetchingData(false);
      }
    };

    fetchUserData();
  }, [user]);
  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Redirect to sign-in if not authenticated
  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  const handleLogOut = async () => {
    await logout();
    router.replace("/sign-in");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome!</Text>
      <Text style={styles.userEmail}>
        {userData?.fullName || user.email}
      </Text>
      <TouchableOpacity style={styles.logOutButton} onPress={handleLogOut}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  welcome: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 10,
    color: "#1f2938",
  },
  userEmail: {
    fontSize: 18,
    color: "#4b5563",
    marginBottom: 30,
  },
  logoutText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  logOutButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
});
