import { createClient } from '@supabase/supabase-js'

const key = process.env.SUPABASE_KEY || ""
const url= process.env.SUPABASE_URL || ""

if (!url) {
  throw new Error("Could not read Supabase URL from env file")
}

if (!key) {
  throw new Error("Could not read Supabase key from env file")
}

export const supabaseImgRootPath = `${url}/storage/v1/object/public`

export const supabase = createClient(url, key)