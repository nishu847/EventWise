import React from 'react';

const developers = [
    {
        name: 'Nishu Sharma',
        role: 'Full Stack Developer',
        contribution: 'Led the design and implementation of the user interface and experience along with all the backend login and database management.',
        image: 'src/assets/nishuimg.jpg' 
    }
];

const About = () => {
    return (
      <div className="p-6 bg-gray-100 font-sans mt-20"> {/* Added mt-12 for top margin */}
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">About Us</h1>
            <section className="max-w-3xl mx-auto mb-12">
                <p className="text-lg text-center text-gray-700">
                    Welcome to <strong>Eventwise</strong>, where creativity and technology converge to familiarize you with all the events of <strong>CGC Landran</strong>.
                    Our team is committed to delivering an exceptional experience through our expertise so that you know about every event taking place in campus beforehand and an easy way to get required items or tools from seniors.
                </p>
            </section>

            <div className="max-w-5xl mx-auto py-16 px-6 grid grid-cols-1 items-center gap-12">
        {/* Mission Section */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-4xl font-bold mb-4 text-[#6c9380]">
            <span className="text-black">Our</span> Mission
          </h2>
          <div className="leading-loose text-gray-200 max-w-2xl bg-[#6c9380] rounded-lg py-4 px-20">
          At EventWise, our mission is to create a vibrant platform that keeps the college community informed about the latest events, activities, and opportunities on campus. We aim to foster connections between students by offering a seamless way for users to explore, participate in, and engage with campus life. Additionally, we strive to promote sustainability and resource-sharing through our marketplace, where students can easily acquire second-hand tools and materials from seniors, encouraging collaboration and support within the college community.
          </div>
        </div>

        {/* Image Section */}
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-8 mt-12">
            <img
              src=""
              alt="Our Mission"
              className="order-1 md:order-2 w-full h-64 bg-slate-200 object-contain rounded-lg shadow-md transform transition duration-500 hover:scale-105"
            />
            <img
              src=""
              alt="Our Mission"
              className="order-1 md:order-2 w-full h-64 bg-slate-200 object-contain rounded-lg shadow-md transform transition duration-500 hover:scale-105"
            />
            <img
              src=""
              alt="Our Mission"
              className="order-1 md:order-2 w-full h-64 bg-slate-200 object-contain rounded-lg shadow-md transform transition duration-500 hover:scale-105"
            />
            <img
              src=""
              alt="Our Mission"
              className="order-1 md:order-2 w-full h-64 bg-slate-200 object-contain rounded-lg shadow-md transform transition duration-500 hover:scale-105"
            />
          </div>

          {/* Centered div below all the others */}
          <div className="flex justify-center mt-12">
            <img
              src=""
              alt="Our Mission"
              className="w-[50%] h-64 bg-slate-200 object-contain rounded-lg shadow-md transform transition duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>

            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Meet Our Developers</h2>

            <div className="flex flex-wrap justify-center gap-8">
                {developers.map((developer, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg p-6 max-w-xs w-full text-center flex flex-col justify-between">
                        <img 
                            src={developer.image} 
                            alt={developer.name} 
                            className="w-32 h-32 mx-auto rounded-full mb-4 object-cover" 
                        />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{developer.name}</h3>
                        <p className="text-gray-600 mb-4">{developer.role}</p>
                        <p className="text-gray-700 flex-grow">{developer.contribution}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default About;
