<script setup lang="ts">

useSeoMeta({
  title: "Appstate Getter - Get your appstate, cookie, and access token!",
  ogTitle: "Appstate Getter - Get your appstate, cookie, and access token!",
  description: "Get your appstate, cookie, and access token!",
  ogDescription:
    "Get your appstate, cookie, and access token!",
  ogImage: "/favicon.png",
  twitterCard: "summary_large_image",
});

import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import useGetState from '~/composables/useGetState';
import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast()
import { ref } from 'vue'
import * as z from 'zod'

let btnSubmit = ref("Get Appstate");
let btnCopy = ref("Copy Appstate");
let appstateValue = ref(null);
let cookieValue = ref(null);
let tokenValue = ref(null);

const { getCookie } = useGetState();


const formSchema = toTypedSchema(z.object({
  email: z.string().min(1).max(50),
  password: z.string().min(1).max(50),
}))
const form = useForm({
  validationSchema: formSchema,
})
const onSubmit = form.handleSubmit(async (cred) => {
  try {
    btnSubmit.value = "Loading...";
    const cookie = await getCookie(cred.email,  cred.password);
    console.log(cred);
    let pretty = JSON.stringify(cookie.appstate, null, 2) + '\n';
    appstateValue.value = pretty;
    cookieValue.value = cookie.raw_cookies;
    tokenValue.value = cookie.access_token;
    btnSubmit.value = "Get Appstate";
    toast({
        title: 'Success!',
        description: 'Click the text you want to copy!',
      });
  } catch (error) {
    console.log(error);
    toast({
        title: 'Failed to get Appstate!',
        description: 'Please double check your credentials.',
      });
    btnSubmit.value = "Get Appstate";
  }
})


const handleCopy = async (btn: string): Promise<void> => {
  if(appstateValue.value && cookieValue.value && tokenValue.value) {
    let value = "";
    switch(btn) {
      case "appstate": 
        value = appstateValue.value;
        toast({
        title: 'Copied!',
        description: 'Successfully copied appstate value.',
      });
        break;
      case "cookie": 
        value = cookieValue.value;
        toast({
        title: 'Copied!',
        description: 'Successfully copied cookie value.',
      });
        break;
      case "token": 
        value = tokenValue.value;
        toast({
        title: 'Copied!',
        description: 'Successfully copied token value.',
      });
        break;
      default: 
        value = "";
    }
    if (value) {
      try {
        await navigator.clipboard.writeText(value,
        );
      } catch (err) {
        console.error("Error copying text to clipboard: ", err);
      }
    }
  }
  };
</script>
<template>
  <Navbar />
  <div class="h-screen w-full">
  <div class="w-full bg-white dark:bg-gray-950 pt-10 flex flex-col md:flex-row md:justify-between md:items-center">
    
    <form class="mx-6 md:ml-12 md:w-[50%]" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email/Username/Link</FormLabel>
        <FormControl>
          <Input class="py-5" type="text" placeholder="serofukuu@gmail.com" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    
    <FormField v-slot="{ componentField }" name="password">
      <FormItem class="mt-3">
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input class="py-5" type="password" placeholder="bowlbowl" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    
    <Button class="w-full mt-4 py-5" type="submit">
      {{ btnSubmit }}
    </Button>
  </form>
  
  <div class="mx-6 md:mr-12 mt-14 md:mt-0 md:w-[50%]">
    <label class="font-bold text-md">Appstate</label>
    <Textarea @click="handleCopy('appstate')" class="mt-2 mb-5 resize-none font-medium p-5 text-sky-400 focus-visible:ring-sky-400" placeholder="Your appstate will show here" rows="8" v-model="appstateValue" readonly></Textarea>
    <label class="font-bold text-md">Cookie</label>
    <Textarea @click="handleCopy('cookie')" class="mt-2 mb-5 resize-none font-medium p-5 text-sky-400 focus-visible:ring-sky-400" placeholder="Your raw cookie will show here" v-model="cookieValue" readonly></Textarea>
    <label class="font-bold text-md">Access Token</label>
    <Textarea @click="handleCopy('token')" class="mt-2 mb-5 resize-none font-medium p-5 text-sky-400 focus-visible:ring-sky-400" placeholder="Your access token will show here" v-model="tokenValue" readonly></Textarea>
  </div>
  
  </div>
  <footer class="relative flex items-center bottom-0 pt-10 pb-10 justify-center w-full">
    <p class="text-gray-400 dark:text-gray-600 text-center text-md">© Copyright 2024, <a class="text-sky-300 hover:underline" href="https://serofuku.vercel.app/">serofukuu</a> Allrights reserved.</p>
  </footer>
  </div>
  <Toaster />
</template>
