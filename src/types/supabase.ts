export type Database = {
  public: {
    Tables: {
      [key: string]: any;
      accountability_partners: {
        Row: AccountabilityPartner;
        Insert: Omit<AccountabilityPartner, "id" | "created_at" | "updated_at">;
        Update: Partial<
          Omit<AccountabilityPartner, "id" | "created_at" | "updated_at">
        >;
      };
    };
  };
};

export interface AccountabilityPartner {
  id: string;
  user_id: string;
  partner_email: string;
  partner_name: string;
  created_at: string;
  updated_at: string;
}
