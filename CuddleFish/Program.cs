using System;
using System.Diagnostics;

namespace CuddleFishConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Start CuddleFish!");
            var psiNpmRunDist = new ProcessStartInfo
            {
                FileName = "cmd",
                RedirectStandardInput = true,
                WorkingDirectory = "..\\AngularClient"
            };
            var pNpmRunDist = Process.Start(psiNpmRunDist);
            //pNpmRunDist.StandardInput.WriteLine("npm run dist & exit");
            pNpmRunDist.StandardInput.WriteLine("npm start");
            pNpmRunDist.WaitForExit();
        }
    }
}
