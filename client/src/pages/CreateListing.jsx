import { getDownloadURL, getStorage, uploadBytesResumable } from "firebase/storage"
import { useState } from "react"
import { app } from "../../firebase"


export default function CreateListing() {
    const [files, setFiles]= useState([])
    console.log(files)

    const handleImageSubmit=(e)=>{

        if(files.length>0 && files.length<7){
            const promises=[]

            for(let i=0; i<files.length; i++ ){
                promises.push(storeImage(files[i]))
            }
        }
    }

    const storeImage=async (file)=>{
        return new Promise((resolve, reject)=>{
            const storage = getStorage(app)
            const fileName= new Date().getTime()+file.name
            const storageRef= ref(storage, fileName)
            const uploadTask= uploadBytesResumable(storageRef, file)
            uploadTask.on("state changed",
                 (error)=>{
                    reject(error)
                 },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                        resolve(downloadURL)
                    })
                }
                )
        })
    }
  return (
    <main className="p-3 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7"> Create a listing</h1>
        <form className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-2 flex-1">
            <input className=" border p-3 rounded-lg" type="text" placeholder="Name" id="name" maxLength='62' minLength='10' required/>
            <textarea className=" border p-3 rounded-lg" type="text" placeholder="Description" id="description"  required/>
            <input className=" border p-3 rounded-lg" type="text" placeholder="Address" id="address" required/>
            <div className="flex gap-6 flex-wrap">
                <div className="flex gap-2">
                    <input className="w-5" type="checkbox" id="sale"/>
                    <span>Sell</span>
                </div>
                <div className="flex gap-2">
                    <input className="w-5" type="checkbox" id="rent"/>
                    <span>Rent</span>
                </div>
                <div className="flex gap-2">
                    <input className="w-5" type="checkbox" id="parking"/>
                    <span>Parking Spot</span>
                </div>
                <div className="flex gap-2">
                    <input className="w-5" type="checkbox" id="furnished"/>
                    <span>Furnished</span>
                </div>
                <div className="flex gap-2">
                    <input className="w-5" type="checkbox" id="offer"/>
                    <span>Offer</span>
                </div>
            </div>
            <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                    <input className="p-3 border border-gray-300 rounded-lg" type="number" min="1" max="10" id="bedrooms"/>
                    <p>Beds</p>
                </div>
                <div className="flex items-center gap-2">
                    <input className="p-3 border border-gray-300 rounded-lg" type="number" min="1" max="10" id="bathroom"/>
                    <p>Baths</p>
                </div>
                <div className="flex items-center gap-2">
                    <input className="p-3 border border-gray-300 rounded-lg" type="number" min="1" max="10" id="regularPrice"/>
                    <div className="flex flex-col items-center">
                    <p>Regular Price</p>
                    <span className="text-sm">($/month)</span>
                    </div>
                   
                </div>
                <div className="flex items-center gap-2">
                    <input className="p-3 border border-gray-300 rounded-lg" type="number" min="1" max="10" id="discountPrice"/>
                    <div className="flex flex-col items-center">
                    <p>Discount Price</p>
                    <span className="text-sm">($/month)</span>
                    </div>
                    
                </div>
            </div>
            </div>

            <div className="flex flex-col flex-1 gap-4">
                <p className="font-semibold">Images:
                <span className="text-gray-600 ml-2">The first image will be the cover (max-2)</span>
                </p>
                <div className="flex gap-4">
                    <input 
                    onChange={(e)=>setFiles(e.target.files)}
                    className="p-3 border border-gray-300 rounded-lg w-full" type="file" id="images" accept="image/*" multiple />
                    <button type="button" onClick={handleImageSubmit} className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opcatity-80">Upload</button>
                </div>
                <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Create Listing</button>
            </div>
           
        </form>
    </main>
  )
}
