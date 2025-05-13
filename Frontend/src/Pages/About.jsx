import React from 'react';

const developers = [
    {
        name: 'Nishu Sharma',
        role: 'Full Stack Developer',
        contribution: 'Led the design and implementation of the user interface and experience along with all the backend login and database management.',
        image: 'assets/nishuimg.jpg' 
    }
];

const About = () => {
    return (
      <div className="p-6 bg-[#0f0607] font-sans mt-20 ">
            <h1 className="text-4xl font-bold text-center text-[#fdfeec] mb-6">About Us</h1>
            <section className="max-w-full mx-auto mb-12">
                <p className="text-lg text-center text-[#fdfeec]">
                    Welcome to <strong>Eventwise</strong>, where creativity and technology converge to familiarize you with all the events of <strong>CGC Landran</strong>.
                    Our team is committed to delivering an exceptional experience through our expertise so that you know about every event taking place in campus beforehand and an easy way to get required items or tools from seniors.
                </p>
            </section>
            <div className="max-w-full mx-auto py-6 px-6 grid grid-cols-1 items-center gap-12">
        {/* Mission Section */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-4xl font-bold mb-4 text-[#f4aca4]">
            <span className="text-[#fdfeec]">Our</span> Mission
          </h2>
          <div className="leading-loose text-[#] max-w-2xl bg-[#fdfeec] rounded-lg py-4 px-20"  style={{ border: '2px solid #ef8275' }}>
          At EventWise, our mission is to create a vibrant platform that keeps the college community informed about the latest events, activities, and opportunities on campus. We aim to foster connections between students by offering a seamless way for users to explore, participate in, and engage with campus life. Additionally, we strive to promote sustainability and resource-sharing through our marketplace, where students can easily acquire second-hand tools and materials from seniors, encouraging collaboration and support within the college community.
          </div>
        </div>
      </div>

            <h2 className="text-3xl font-semibold text-center text-[#fdfeec] mb-8">Meet Our Developers</h2>

            <div className="flex flex-wrap justify-center gap-8">
                {developers.map((developer, index) => (
                    <div key={index} className="bg-[#f4aca4] rounded-lg shadow-lg p-6 max-w-xs w-full text-center flex flex-col justify-between" style={{ border: '2px solid #fdfeec' }}>
                        <img 
                            src={developer.image} 
                            alt={developer.name} 
                            className="w-32 h-32 mx-auto rounded-full mb-4 object-cover" 
                        />
                        <h3 className="text-xl font-semibold text-[#1e3034] mb-2">{developer.name}</h3>
                        <p className="text-[#1e3034] mb-4">{developer.role}</p>
                        <p className="text-[#1e3034] flex-grow">{developer.contribution}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default About;
