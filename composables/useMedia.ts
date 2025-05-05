import { ref, computed } from 'vue'

interface Media {
  id: string
  name: string
  url: string
  thumbnail: string
  size: string
  type: string
  width?: number
  height?: number
  uploadedAt: string
}

export default function useMedia() {
  const mediaItems = ref<Media[]>([])
  const selectedMedia = ref<Media | null>(null)
  const filterType = ref('all')
  const searchQuery = ref('')
  const isLoading = ref(false)

  const generateRandomMedia = (count: number = 12): Media[] => {
    const types = [
      { type: 'image/jpeg', ext: 'jpg' },
      { type: 'image/png', ext: 'png' },
      { type: 'application/pdf', ext: 'pdf' },
    ]
    
    const sizes = ['250KB', '1.2MB', '3.5MB', '5MB', '800KB']
    
    return Array.from({ length: count }, (_, i) => {
      const randomType = types[Math.floor(Math.random() * types.length)]
      const randomSize = sizes[Math.floor(Math.random() * sizes.length)]
      const randomId = Math.random().toString(36).substring(2, 9)
      const randomName = `media-${i+1}.${randomType.ext}`
      const imageId = Math.floor(Math.random() * 1000)
      
      return {
        id: randomId,
        name: randomName,
        type: randomType.type,
        size: randomSize,
        width: 800,
        height: 600,
        uploadedAt: new Date().toISOString(),
        url: `https://picsum.photos/id/${imageId}/800/600`,
        thumbnail: `https://picsum.photos/id/${imageId}/300/200`,
      }
    })
  }

  const filteredMedia = computed(() => {
    return mediaItems.value.filter(media => {
      const matchesType = filterType.value === 'all' || 
        (filterType.value === 'image' && media.type.startsWith('image')) ||
        (filterType.value === 'document' && !media.type.startsWith('image'))
      
      const matchesSearch = media.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      
      return matchesType && matchesSearch
    })
  })

  const fetchMedia = async () => {
    isLoading.value = true
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      mediaItems.value = generateRandomMedia(24)
    } finally {
      isLoading.value = false
    }
  }

  const addMedia = (media: Media) => {
    mediaItems.value.unshift(media)
  }

  const deleteMedia = (id: string) => {
    mediaItems.value = mediaItems.value.filter(media => media.id !== id)
    if (selectedMedia.value?.id === id) {
      selectedMedia.value = null
    }
  }

  return {
    mediaItems,
    selectedMedia,
    filterType,
    searchQuery,
    isLoading,
    filteredMedia,
    fetchMedia,
    addMedia,
    deleteMedia
  }
}