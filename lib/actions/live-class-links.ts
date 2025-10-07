"use server";

import { getSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export interface LiveClassLinkData {
  title: string;
  description?: string;
  link_url: string;
  meeting_platform?: string;
  scheduled_time?: string;
  duration?: string;
  is_active?: boolean;
}

export async function createLiveClassLink(linkData: LiveClassLinkData) {
  const supabase = await getSupabaseServerClient();
  
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error("User not authenticated");
    }

    const { data: link, error: linkError } = await supabase
      .from('live_class_links')
      .insert({
        instructor_id: user.id,
        title: linkData.title,
        description: linkData.description,
        link_url: linkData.link_url,
        meeting_platform: linkData.meeting_platform || 'zoom',
        scheduled_time: linkData.scheduled_time,
        duration: linkData.duration,
        is_active: linkData.is_active !== false
      })
      .select()
      .single();

    if (linkError) {
      throw new Error(`Failed to create live class link: ${linkError.message}`);
    }

    revalidatePath('/dashboard/instructor');
    revalidatePath('/dashboard');
    return { success: true, link };
  } catch (error) {
    console.error('Error creating live class link:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function getInstructorLiveClassLinks() {
  const supabase = await getSupabaseServerClient();
  
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error("User not authenticated");
    }

    const { data: links, error: linksError } = await supabase
      .from('live_class_links')
      .select('*')
      .eq('instructor_id', user.id)
      .order('created_at', { ascending: false });

    if (linksError) {
      throw new Error(`Failed to fetch links: ${linksError.message}`);
    }

    return { success: true, links: links || [] };
  } catch (error) {
    console.error('Error fetching instructor links:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function getActiveLiveClassLinks() {
  const supabase = await getSupabaseServerClient();
  
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error("User not authenticated");
    }

    const { data: links, error: linksError } = await supabase
      .from('live_class_links')
      .select('*')
      .eq('is_active', true)
      .order('scheduled_time', { ascending: true, nullsFirst: false });

    if (linksError) {
      throw new Error(`Failed to fetch links: ${linksError.message}`);
    }

    return { success: true, links: links || [] };
  } catch (error) {
    console.error('Error fetching active links:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function updateLiveClassLink(linkId: string, linkData: Partial<LiveClassLinkData>) {
  const supabase = await getSupabaseServerClient();
  
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error("User not authenticated");
    }

    const { error } = await supabase
      .from('live_class_links')
      .update({
        ...linkData,
        updated_at: new Date().toISOString()
      })
      .eq('id', linkId)
      .eq('instructor_id', user.id);

    if (error) {
      throw new Error(`Failed to update link: ${error.message}`);
    }

    revalidatePath('/dashboard/instructor');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error updating link:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function deleteLiveClassLink(linkId: string) {
  const supabase = await getSupabaseServerClient();
  
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      throw new Error("User not authenticated");
    }

    const { error } = await supabase
      .from('live_class_links')
      .delete()
      .eq('id', linkId)
      .eq('instructor_id', user.id);

    if (error) {
      throw new Error(`Failed to delete link: ${error.message}`);
    }

    revalidatePath('/dashboard/instructor');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error deleting link:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}