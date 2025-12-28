<template>
  <div
    class="flex items-center justify-center rounded-xl overflow-hidden shrink-0 bg-gray-800 border border-gray-700"
    :class="sizeClasses"
  >
    <!-- Image Logo -->
    <img
      v-if="logoUrl && !hasError"
      :src="logoUrl"
      :alt="name"
      class="w-full h-full object-cover"
      @error="handleError"
    />

    <!-- Fallback Icon -->
    <component
      v-else
      :is="fallbackIcon"
      class="text-gray-400"
      :class="iconSizeClasses"
    />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import {
  CreditCard,
  Zap,
  Smartphone,
  Wallet,
  Music,
  Video,
  Cloud,
  Server,
  Cpu,
  ShoppingBag,
  Home,
  Dumbbell
} from 'lucide-vue-next';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: 'md', // sm, md, lg
  },
});

const hasError = ref(false);

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm': return 'w-8 h-8';
    case 'lg': return 'w-16 h-16';
    default: return 'w-12 h-12';
  }
});

const iconSizeClasses = computed(() => {
  switch (props.size) {
    case 'sm': return 'w-4 h-4';
    case 'lg': return 'w-8 h-8';
    default: return 'w-6 h-6';
  }
});

// Brand Domain Map
const brandDomains = {
  netflix: 'netflix.com',
  aws: 'aws.amazon.com',
  amazon: 'amazon.com',
  spotify: 'spotify.com',
  gemini: 'gemini.google.com',
  gpt: 'openai.com',
  openai: 'openai.com',
  gcp: 'cloud.google.com',
  google: 'google.com',
  youtube: 'youtube.com',
  apple: 'apple.com',
  icloud: 'icloud.com',
  adobe: 'adobe.com',
  figma: 'figma.com',
  github: 'github.com',
  vercel: 'vercel.com',
  digitalocean: 'digitalocean.com',
  heroku: 'heroku.com',
  slack: 'slack.com',
  discord: 'discord.com',
  notion: 'notion.so',
  linear: 'linear.app',
  twitter: 'twitter.com',
  x: 'twitter.com',
  facebook: 'facebook.com',
  instagram: 'instagram.com',
  linkedin: 'linkedin.com',
  steam: 'steampowered.com',
  playstation: 'playstation.com',
  xbox: 'xbox.com',
  nintendo: 'nintendo.com',
  indihome: 'indihome.co.id',
  biznet: 'biznetnetworks.com',
  telkomsel: 'telkomsel.com',
};

const logoUrl = computed(() => {
  if (!props.name) return null;
  
  const normalizedName = props.name.toLowerCase().replace(/\s+/g, '');
  // Check exact match or partial match in brand map
  const brandKey = Object.keys(brandDomains).find(key => normalizedName.includes(key));
  
  if (brandKey) {
    const domain = brandDomains[brandKey];
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  }
  
  return null;
});

// Fallback Icon Logic
const fallbackIcon = computed(() => {
  const lowerName = props.name.toLowerCase();

  if (lowerName.includes('arisan') || lowerName.includes('tabungan') || lowerName.includes('invest')) return Wallet;
  if (lowerName.includes('kost') || lowerName.includes('kontrakan') || lowerName.includes('sewa') || lowerName.includes('house')) return Home;
  if (lowerName.includes('gym') || lowerName.includes('fitness') || lowerName.includes('yoga') || lowerName.includes('workout')) return Dumbbell;
  if (lowerName.includes('listrik') || lowerName.includes('pln') || lowerName.includes('token')) return Zap;
  if (lowerName.includes('pulsa') || lowerName.includes('paket') || lowerName.includes('data') || lowerName.includes('internet') || lowerName.includes('wifi')) return Smartphone;
  if (lowerName.includes('music') || lowerName.includes('lagu')) return Music;
  if (lowerName.includes('video') || lowerName.includes('movie') || lowerName.includes('tv') || lowerName.includes('stream')) return Video;
  if (lowerName.includes('cloud') || lowerName.includes('server') || lowerName.includes('hosting') || lowerName.includes('vps')) return Server;
  if (lowerName.includes('shop') || lowerName.includes('belanja') || lowerName.includes('paylater')) return ShoppingBag;
  
  return CreditCard; // Default generic
});

const handleError = () => {
  hasError.value = true;
};

// Reset error when name changes
watch(() => props.name, () => {
  hasError.value = false;
});
</script>
