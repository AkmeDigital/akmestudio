export default function Footer() {
  return (
    <footer className="absolute bottom-0 w-full z-10">
        <div className='flex'>
          <div className="w-1/2">
            <p>
              For Project inquiries and more information, get in tourch at <a href='mailto:ontact@akmestudio.com'>contact@akmestudio.com</a>
            </p>
          </div>
          <div className="flex flex-1 justify-end w-1/2">
            <div className="w-1/4" ><a target='_blank' href='https://www.instagram.com/akme.studio/'>@akme.studio</a></div>
            <div className="w-1/4" >Copyright Akmē Studio</div>

          </div>
        </div>
    </footer>
  )
}