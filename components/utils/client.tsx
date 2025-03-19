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
