// ==============================================
// Imports (always at the top of the file)
// ==============================================
import { ID, Query, Permission, Role } from 'appwrite';
import {
  account, databases, storage,
  APPWRITE_DB_ID, APPWRITE_COL_ID, APPWRITE_BUCKET_ID,
  APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID
} from './src/appwrite.js';

// ==============================================
// Constants
// ==============================================
const ADMIN_EMAIL = 'milkyyeeter69@gmail.com';

// Static gallery images (fallback + legacy content)
const STATIC_IMAGES = [
  "https://cdn.discordapp.com/attachments/1449890084659658772/1482510537907769344/brave_iESlNUstT6.png?ex=69b73707&is=69b5e587&hm=bb068853832bfcb85c1253f56a98fe616c3e72079380a7c1120fa241fd7e021a&",
  "https://cdn.discordapp.com/attachments/1449890084659658772/1482510774675968214/brave_qXQOLW6u3F.png?ex=69b73740&is=69b5e5c0&hm=2a5fa1da141a731b50cb4625e213d439b7f605d49e5824f801e1512fc347018e&",
  "https://cdn.discordapp.com/attachments/1416908088283365427/1447048182436593707/togif.gif?ex=69b6be63&is=69b56ce3&hm=cf1e443d2b61903ce8e6ef572b0e46528190363e40ba5101a0c679740cd71892&",
  "https://cdn.discordapp.com/attachments/1449890084659658772/1482207194656280717/togif.gif?ex=69b6c545&is=69b573c5&hm=c7ea7325af745ee9ec212480f7ce79298dce611394da5ad7b772672bbcc8e70b&",
  "https://cdn.discordapp.com/attachments/1449890084659658772/1482104592136143068/togif.gif?ex=69b70e76&is=69b5bcf6&hm=e712178619f37d1424d52d7b64789940a8043e286a5bb3bc35455b74b1e1fea0&",
  "https://cdn.discordapp.com/attachments/1449890084659658772/1481484252636905623/togif.gif?ex=69b6c6fa&is=69b5757a&hm=987994c40e3a7aac75f6cb14461da30e4c591ced59abb064330b4419404f90d3&",
  "https://cdn.discordapp.com/attachments/1449890084659658772/1477400212585578506/togif.gif?ex=69b714ab&is=69b5c32b&hm=a3a6d0f47f0e184e28671b2b891aa3ec2f7b01c92df9c622d5dc40a0256f5b4e&",
  "https://cdn.discordapp.com/attachments/1449890084659658772/1476694204095791315/togif.gif?ex=69b72625&is=69b5d4a5&hm=6dd59bbc5e3e56508704dd5fb6d34c39f243ec2e28993f221727721cc3a9c8d1&",
  "https://cdn.discordapp.com/attachments/1449890084659658772/1476694253433524224/togif.gif?ex=69b72631&is=69b5d4b1&hm=b2def19e93b466904de4075b2a28282f522862d86e00a9c71869a0ab9f407c68&",
  "https://cdn.discordapp.com/attachments/1449890084659658772/1476694181970972682/togif.gif?ex=69b72620&is=69b5d4a0&hm=8e5718d061999870e1b13a81ac204a6a173fcd691f47b896bd6fc447449c66fc&",
  "https://cdn.discordapp.com/attachments/1464814123031466196/1464847199367069909/togif.gif?ex=69b6e583&is=69b59403&hm=2d27f347c0044e5bf7412abade6571f685f4578f16cd58baf3309a323b39d6e1&",
  "https://cdn.discordapp.com/attachments/1464378691705372776/1464384063229132874/Screenshot_20260123_171913.gif?ex=69b687af&is=69b5362f&hm=92dc6664b2aecdb983867d362a600fe29c6e38c13bef27bc2105eade597c358c&",
  "https://cdn.discordapp.com/attachments/1464378691705372776/1464383186640441475/image.gif?ex=69b686de&is=69b5355e&hm=74f58c42f6740d973ab5b615e69152cc554e7716d7dcbcdbaae40c49b13a8ce7&",
  "https://cdn.discordapp.com/attachments/1449890084659658772/1454948984693985320/togif.gif?ex=69b72455&is=69b5d2d5&hm=439c9a48583c58b45ade2faa10c2ff432abc43c7ead3a67e8bb31fa2cc1b2e79&",
  "https://cdn.discordapp.com/attachments/1449890084659658772/1454682846533779538/togif.gif?ex=69b6d539&is=69b583b9&hm=78df67d50ca1c5f6eb226680d751910a882e14146d79e15262b43250a009307c&",
  "https://cdn.discordapp.com/attachments/1453992121311690795/1453993952989413541/speechmemified_pasteimage_1.gif?ex=69b6f6a4&is=69b5a524&hm=dd5115e3e7eb8bcba5349fbf1492cf76c183870831ea04a951bc54fa9ca54749&",
  "https://cdn.discordapp.com/attachments/1419400294290296913/1449142127551451279/balls.gif?ex=69b71c46&is=69b5cac6&hm=e54ca0bdd7d965a742a47135385f96999195ec2d96ce4e5db3df1475d136c7bf&",
  "https://cdn.discordapp.com/attachments/1416908088283365427/1443432332810784768/togif.gif?ex=69b6c5dd&is=69b5745d&hm=5c3447e1ba83de84f348980e9d9287222faeeae386cbea2901a2fe82144fd26a&",
  "https://cdn.discordapp.com/attachments/1416908088283365427/1443432228830052494/togif.gif?ex=69b6c5c5&is=69b57445&hm=06b7bab020b113dbd7ce05fe5ddeeecac62683802754d116c917112074636662&",
  "https://cdn.discordapp.com/attachments/1416908088283365427/1443432081870032986/togif.gif?ex=69b6c5a1&is=69b57421&hm=cf8eef0d15df21f3c7630e8a85488029c75539dedc973d180dcd7af47bfe3f56&",
  "https://cdn.discordapp.com/attachments/1416908088283365427/1432914462150754335/togif.gif?ex=69b6bdd6&is=69b56c56&hm=88f8f96a636a2327c349e56c99f426141a898f15fc9f5ec098888496c0aaaf2b&",
  "https://cdn.discordapp.com/attachments/1416908088283365427/1424273827990601759/cAAAA.gif?ex=69b6f29e&is=69b5a11e&hm=7d30241ca457e8e6d1139991ff3f7391cbdb7a5b1dbfa728f54eb122adf3bf72&",
  "https://cdn.discordapp.com/attachments/1416908088283365427/1436167891635404921/togif.gif?ex=69b6b654&is=69b564d4&hm=328f6542d9710aad6f79a337fa22e979029fdaff6834466de361e8bf6f88ceec&"
];

// ==============================================
// DOM References
// ==============================================
const adminLoginLink = document.getElementById('admin-login-link');
const adminPanel = document.getElementById('admin-panel');
const uploadBtn = document.getElementById('upload-btn');
const imageUpload = document.getElementById('image-upload');
const urlInput = document.getElementById('url-input');
const urlUploadBtn = document.getElementById('url-upload-btn');
const uploadStatus = document.getElementById('upload-status');
const galleryGrid = document.getElementById('gallery-grid');
const lightboxModal = document.getElementById('lightbox-modal');
const lightboxMedia = document.getElementById('lightbox-media');

// ==============================================
// Utility: Detect if a URL points to a video
// ==============================================
function isVideoUrl(url) {
  // Check actual video file extensions
  if (/\.(mp4|webm|mov|avi)(\?|#|$)/i.test(url)) return true;
  // Check the ext= query param we attach during upload
  const extMatch = url.match(/[?&]ext=(\w+)/i);
  if (extMatch) {
    const ext = extMatch[1].toLowerCase();
    return ['mp4', 'webm', 'mov', 'avi'].includes(ext);
  }
  return false;
}

// ==============================================
// Parallax Orbs
// ==============================================
document.addEventListener('mousemove', (e) => {
  const orbs = document.querySelectorAll('.orb');
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  orbs.forEach((orb, i) => {
    const factor = i % 2 === 0 ? 1 : -1;
    orb.style.transform = `translate(${(x * 40 - 20) * factor}px, ${(y * 40 - 20) * factor}px)`;
  });
});

// ==============================================
// 3D Card Hover Effect
// ==============================================
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const rotateX = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -5;
    const rotateY = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 5;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    card.style.transition = 'transform 0.1s ease';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    card.style.transition = 'transform 0.5s ease';
  });
});

// ==============================================
// Authentication
// ==============================================
let currentUser = null;

async function checkAuth() {
  try {
    currentUser = await account.get();
    if (adminLoginLink) adminLoginLink.textContent = 'Log out';

    if (currentUser.email === ADMIN_EMAIL) {
      if (adminPanel) adminPanel.style.display = 'flex';
    } else {
      if (adminPanel) adminPanel.style.display = 'none';
    }
  } catch {
    currentUser = null;
    if (adminLoginLink) adminLoginLink.textContent = 'Admin Login';
    if (adminPanel) adminPanel.style.display = 'none';
  }
}

if (adminLoginLink) {
  adminLoginLink.addEventListener('click', async (e) => {
    e.preventDefault();
    if (currentUser) {
      await account.deleteSession('current');
      window.location.reload();
    } else {
      account.createOAuth2Session('discord', window.location.href, window.location.href);
    }
  });
}

// ==============================================
// Upload Handler
// ==============================================
if (uploadBtn) {
  uploadBtn.addEventListener('click', async () => {
    const file = imageUpload?.files[0];
    if (!file) {
      uploadStatus.textContent = 'Please select a file first.';
      return;
    }

    try {
      uploadBtn.disabled = true;
      uploadStatus.textContent = 'Uploading to Storage…';

      const uploaded = await storage.createFile(
        APPWRITE_BUCKET_ID, ID.unique(), file,
        [Permission.read(Role.any()), Permission.write(Role.user(currentUser.$id))]
      );

      const fileExt = file.name.split('.').pop().toLowerCase();
      const fileUrl = `${APPWRITE_ENDPOINT}/storage/buckets/${APPWRITE_BUCKET_ID}/files/${uploaded.$id}/view?project=${APPWRITE_PROJECT_ID}&ext=${fileExt}`;

      uploadStatus.textContent = 'Saving to Database…';
      await databases.createDocument(
        APPWRITE_DB_ID, APPWRITE_COL_ID, ID.unique(),
        { url: fileUrl },
        [Permission.read(Role.any()), Permission.write(Role.user(currentUser.$id))]
      );

      uploadStatus.textContent = '✅ Upload complete! Refreshing…';
      imageUpload.value = '';
      setTimeout(() => window.location.reload(), 1200);
    } catch (err) {
      uploadStatus.textContent = `❌ Error: ${err.message}`;
      console.error('[Upload Error]', err);
      uploadBtn.disabled = false;
    }
  });
}

// ==============================================
// URL Upload Handler
// ==============================================
if (urlUploadBtn) {
  urlUploadBtn.addEventListener('click', async () => {
    const url = urlInput?.value.trim();
    if (!url) {
      uploadStatus.textContent = 'Please paste a URL first.';
      return;
    }

    try {
      urlUploadBtn.disabled = true;
      uploadStatus.textContent = 'Saving to Database…';

      await databases.createDocument(
        APPWRITE_DB_ID, APPWRITE_COL_ID, ID.unique(),
        { url },
        [Permission.read(Role.any()), Permission.write(Role.user(currentUser.$id))]
      );

      uploadStatus.textContent = '✅ Added! Refreshing…';
      urlInput.value = '';
      setTimeout(() => window.location.reload(), 1200);
    } catch (err) {
      uploadStatus.textContent = `❌ Error: ${err.message}`;
      console.error('[URL Upload Error]', err);
      urlUploadBtn.disabled = false;
    }
  });
}

// ==============================================
// Lightbox (supports images AND videos)
// ==============================================
function openLightbox(url) {
  if (!lightboxModal || !lightboxMedia) return;

  // Clear previous content
  lightboxMedia.innerHTML = '';

  if (isVideoUrl(url)) {
    const video = document.createElement('video');
    video.src = url;
    video.controls = true;
    video.autoplay = true;
    video.loop = true;
    video.playsInline = true;
    video.className = 'lightbox-content';
    lightboxMedia.appendChild(video);
  } else {
    const img = document.createElement('img');
    img.src = url;
    img.alt = 'Expanded View';
    img.className = 'lightbox-content';
    lightboxMedia.appendChild(img);
  }

  lightboxModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightboxModal || !lightboxMedia) return;

  lightboxModal.classList.remove('active');
  document.body.style.overflow = '';

  // Stop any playing video
  const video = lightboxMedia.querySelector('video');
  if (video) video.pause();
}

if (lightboxModal) {
  lightboxModal.addEventListener('click', (e) => {
    // Only close if clicking the backdrop, not the media itself
    if (e.target === lightboxModal || e.target === lightboxMedia) {
      closeLightbox();
    }
  });
}

// ==============================================
// Gallery Renderer
// ==============================================
function renderGalleryItem(url) {
  const item = document.createElement('div');
  item.className = 'gallery-item';

  if (isVideoUrl(url)) {
    const video = document.createElement('video');
    video.src = url;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'metadata';
    item.appendChild(video);
  } else {
    const img = document.createElement('img');
    img.src = url;
    img.alt = 'Gallery Image';
    img.loading = 'lazy';
    item.appendChild(img);
  }

  // Click to open lightbox
  item.addEventListener('click', () => openLightbox(url));
  return item;
}

async function loadGallery() {
  if (!galleryGrid) return;
  galleryGrid.innerHTML = '';

  let appwriteImages = [];

  if (APPWRITE_DB_ID && APPWRITE_COL_ID) {
    try {
      const res = await databases.listDocuments(
        APPWRITE_DB_ID, APPWRITE_COL_ID,
        [Query.orderDesc('$createdAt')]
      );
      appwriteImages = res.documents.map(doc => doc.url);
    } catch (err) {
      console.warn('[Gallery] Appwrite fetch failed, using static list:', err.message);
    }
  }

  // Combine: Appwrite uploads first, then hardcoded images
  const allMedia = [...appwriteImages, ...STATIC_IMAGES];

  allMedia.forEach(url => {
    galleryGrid.appendChild(renderGalleryItem(url));
  });
}

// ==============================================
// Initialise
// ==============================================
checkAuth();
loadGallery();

console.log('femboys.me loaded ✨');
