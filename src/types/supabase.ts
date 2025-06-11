export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      comments: {
        Row: {
          content: string;
          created_at: string;
          id: number;
          post_id: number;
          profile_id: string;
          updated_at: string | null;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: number;
          post_id: number;
          profile_id: string;
          updated_at?: string | null;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: number;
          post_id?: number;
          profile_id?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comments_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      follows: {
        Row: {
          created_at: string;
          follower_id: string;
          following_id: string;
        };
        Insert: {
          created_at?: string;
          follower_id: string;
          following_id: string;
        };
        Update: {
          created_at?: string;
          follower_id?: string;
          following_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "follows_follower_id_fkey";
            columns: ["follower_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "follows_following_id_fkey";
            columns: ["following_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      gallery_images: {
        Row: {
          image_url: string;
          post_id: number;
        };
        Insert: {
          image_url: string;
          post_id: number;
        };
        Update: {
          image_url?: string;
          post_id?: number;
        };
        Relationships: [];
      };
      likes: {
        Row: {
          created_at: string;
          id: number;
          post_id: number;
          profile_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          post_id: number;
          profile_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          post_id?: number;
          profile_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "likes_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "likes_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      movie: {
        Row: {
          tmdb_id: number;
        };
        Insert: {
          tmdb_id?: number;
        };
        Update: {
          tmdb_id?: number;
        };
        Relationships: [];
      };
      movie_reviews: {
        Row: {
          content: string;
          created_at: string;
          id: number;
          movie_id: number;
          profile_id: string;
          rating: number;
          updated_at: string | null;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: number;
          movie_id: number;
          profile_id: string;
          rating: number;
          updated_at?: string | null;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: number;
          movie_id?: number;
          profile_id?: string;
          rating?: number;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "movie_reviews_movie_id_fkey";
            columns: ["movie_id"];
            isOneToOne: false;
            referencedRelation: "movie";
            referencedColumns: ["tmdb_id"];
          },
          {
            foreignKeyName: "movie_reviews_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      posts: {
        Row: {
          content: string;
          created_at: string;
          id: number;
          post_type: string;
          profile_id: string;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: never;
          post_type: string;
          profile_id: string;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: never;
          post_type?: string;
          profile_id?: string;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "posts_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
          email: string;
          id: string;
          updated_at: string | null;
          username: string;
        };
        Insert: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          email: string;
          id: string;
          updated_at?: string | null;
          username: string;
        };
        Update: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          email?: string;
          id?: string;
          updated_at?: string | null;
          username?: string;
        };
        Relationships: [];
      };
      puzzle_images: {
        Row: {
          category: string;
          created_at: string;
          id: number;
          image_url: string;
          title: string;
        };
        Insert: {
          category?: string;
          created_at?: string;
          id?: number;
          image_url: string;
          title: string;
        };
        Update: {
          category?: string;
          created_at?: string;
          id?: number;
          image_url?: string;
          title?: string;
        };
        Relationships: [];
      };
      puzzle_scores: {
        Row: {
          id: number;
          profile_id: string;
          score: number;
        };
        Insert: {
          id?: number;
          profile_id: string;
          score: number;
        };
        Update: {
          id?: number;
          profile_id?: string;
          score?: number;
        };
        Relationships: [
          {
            foreignKeyName: "puzzle_results_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      quiz_answers: {
        Row: {
          answered_at: string;
          id: number;
          is_correct: boolean;
          profile_id: string;
          question_id: number;
          selected_answer: string;
        };
        Insert: {
          answered_at?: string;
          id?: number;
          is_correct: boolean;
          profile_id: string;
          question_id: number;
          selected_answer: string;
        };
        Update: {
          answered_at?: string;
          id?: number;
          is_correct?: boolean;
          profile_id?: string;
          question_id?: number;
          selected_answer?: string;
        };
        Relationships: [
          {
            foreignKeyName: "quiz_answers_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "quiz_answers_question_id_fkey";
            columns: ["question_id"];
            isOneToOne: false;
            referencedRelation: "quiz_questions";
            referencedColumns: ["id"];
          }
        ];
      };
      quiz_questions: {
        Row: {
          correct_answer: string;
          difficulty: number | null;
          explanation: string | null;
          id: number;
          options: Json | null;
          question: string;
          type: string | null;
        };
        Insert: {
          correct_answer: string;
          difficulty?: number | null;
          explanation?: string | null;
          id?: number;
          options?: Json | null;
          question: string;
          type?: string | null;
        };
        Update: {
          correct_answer?: string;
          difficulty?: number | null;
          explanation?: string | null;
          id?: number;
          options?: Json | null;
          question?: string;
          type?: string | null;
        };
        Relationships: [];
      };
      review_likes: {
        Row: {
          created_at: string;
          id: number;
          profile_id: string;
          review_id: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          profile_id: string;
          review_id: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          profile_id?: string;
          review_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "review_likes_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "review_likes_review_id_fkey";
            columns: ["review_id"];
            isOneToOne: false;
            referencedRelation: "movie_reviews";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "review_likes_review_id_fkey";
            columns: ["review_id"];
            isOneToOne: false;
            referencedRelation: "movie_reviews_with_likes";
            referencedColumns: ["id"];
          }
        ];
      };

      search_logs: {
        Row: {
          category: string | null;
          created_at: string;
          id: number;
          keyword: string;
          profile_id: string;
        };
        Insert: {
          category?: string | null;
          created_at?: string;
          id?: number;
          keyword: string;
          profile_id: string;
        };
        Update: {
          category?: string | null;
          created_at?: string;
          id?: number;
          keyword?: string;
          profile_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "search_logs_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      movie_reviews_with_likes: {
        Row: {
          content: string | null;
          created_at: string | null;
          id: number | null;
          like_count: number | null;
          movie_id: number | null;
          profile_id: string | null;
          rating: number | null;
          updated_at: string | null;
          username: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "movie_reviews_movie_id_fkey";
            columns: ["movie_id"];
            isOneToOne: false;
            referencedRelation: "movie";
            referencedColumns: ["tmdb_id"];
          },
          {
            foreignKeyName: "movie_reviews_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
    };

    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const;
