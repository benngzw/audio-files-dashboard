import React from 'react'

import AudioTable from '@/components/AudioTable';
import UploadAudioDialog from '@/components/UploadAudioDialog';
import { getUserAudio } from '@/lib/actions';

const Home = async () => {
  const userAudio: Audio[] = await getUserAudio() || [];

  return (
    <section>
      <h1>Audio Dashboard</h1>
      <AudioTable audio={userAudio} />
      <UploadAudioDialog />
    </section>
  )
}

export default Home