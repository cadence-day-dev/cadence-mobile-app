import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://nbtpiznahqhbeqwsgisd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5idHBpem5haHFoYmVxd3NnaXNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5ODY4NjQsImV4cCI6MjA1MzU2Mjg2NH0.VEl1iZ3sSzjbRbpQLIF5abtgOLMt7euDYRNVPNLXMMI",
);

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error.message);
  } else {
    console.log('Successfully signed out');
  }
};

export const fetchUserTimeSlicesNew = async ({
  from_time,
  to_time,
}: {
  from_time: string;
  to_time: string;
}) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id || "<default_user_id>";
  let { data, error } = await supabase.rpc("get_timeslices_for_user", {
    from_time: from_time,
    p_user_id: userId,
    to_time: to_time,
  });
  if (error) {
    console.error("Error fetching new timeslices:", error);
    alert(
      "An error occurred while fetching new timeslices. Please try again.",
    );
  } else {
    return data.data || [];
  }
};