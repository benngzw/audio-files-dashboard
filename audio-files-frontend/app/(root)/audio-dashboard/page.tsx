import AudioTable from '@/components/AudioTable';
import UploadAudioDialog from '@/components/UploadAudioDialog';
import { getUserAudio } from '@/lib/actions';
import React from 'react'

const AudioDashboard = async () => {
  const userAudio: Audio[] = await getUserAudio() || [];

  return (
    <section>
      <h1>User Admin</h1>
      <AudioTable audio={userAudio} />
      <UploadAudioDialog />
    </section>
  )
}

export default AudioDashboard